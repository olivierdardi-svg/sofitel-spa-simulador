import { useCallback, useEffect, useRef, useState } from 'react';
import { play } from '../audio/sfx';
import { scenariosOf, type Scenario } from '../data/business';
import { useFrame } from '../lib/useFrame';
import { challengeLimit, GAME_DURATION_MS, SPORT_REVEAL_MS } from './config';
import { applyOutcome, initialScore, isSuccess, type ScoreState } from './scoring';
import { buildSequence, difficultyAt, isBusiness, shuffle } from './sequence';
import type { BusinessKind, ChallengeKind, Outcome, ScoredOutcome } from './types';

/**
 * intro   READY / GO, clock stopped
 * live    a challenge is playable, both clocks run
 * reveal  the result is shown. The game clock keeps running during the
 *         short sport feedback, and stops while the player reads a
 *         business explanation (reading is never penalised).
 * timeup  the 60 s are over, short "TIME!" before the results screen
 */
export type Phase = 'intro' | 'live' | 'reveal' | 'timeup';

export interface CurrentChallenge {
  /** Unique per challenge instance, used as React key. */
  key: number;
  kind: ChallengeKind;
  difficulty: number;
  limitMs: number;
  scenario?: Scenario;
}

export interface GameSession {
  phase: Phase;
  paused: boolean;
  timeLeftMs: number;
  challengeLeft: number; // 0..1
  challenge: CurrentChallenge;
  index: number;
  score: ScoreState;
  last: ScoredOutcome | null;
  timedOut: boolean;
  setPaused: (p: boolean) => void;
  commit: () => void;
  report: (o: Outcome) => void;
  next: () => void;
  getRemaining: () => number;
}

const INTRO_MS = 1100;
const TIMEUP_MS = 1000;

export function useGameSession(onFinish: (score: ScoreState) => void): GameSession {
  const sequence = useRef(buildSequence(40));
  const bags = useRef<Record<BusinessKind, Scenario[]>>({
    sponsor: shuffle(scenariosOf('sponsor')),
    english: shuffle(scenariosOf('english')),
    law: shuffle(scenariosOf('law')),
  });

  const makeChallenge = useCallback((index: number, elapsed: number): CurrentChallenge => {
    const kind = sequence.current[index % sequence.current.length];
    const difficulty = difficultyAt(elapsed, GAME_DURATION_MS);
    let scenario: Scenario | undefined;
    if (isBusiness(kind)) {
      const bag = bags.current[kind];
      if (bag.length === 0) bags.current[kind] = shuffle(scenariosOf(kind));
      scenario = bags.current[kind].shift();
    }
    return { key: index, kind, difficulty, limitMs: challengeLimit(kind, difficulty), scenario };
  }, []);

  const [phase, setPhase] = useState<Phase>('intro');
  const [paused, setPausedState] = useState(false);
  const [index, setIndex] = useState(0);
  const [challenge, setChallenge] = useState<CurrentChallenge>(() => makeChallenge(0, 0));
  const [score, setScore] = useState<ScoreState>(initialScore);
  const [last, setLast] = useState<ScoredOutcome | null>(null);
  const [timedOut, setTimedOut] = useState(false);

  // Clocks live in refs (updated every frame) and are mirrored to state at a
  // lower resolution to avoid re-rendering the whole tree 60 times a second.
  const timeLeft = useRef(GAME_DURATION_MS);
  const chLeftMs = useRef(challenge.limitMs);
  const committed = useRef(false);
  const phaseRef = useRef<Phase>('intro');
  const indexRef = useRef(0);
  const scoreRef = useRef(score);
  const [timeLeftMs, setTimeLeftMs] = useState(GAME_DURATION_MS);
  const [challengeLeft, setChallengeLeft] = useState(1);

  const go = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  // READY / GO
  useEffect(() => {
    play('whistle');
    const id = window.setTimeout(() => go('live'), INTRO_MS);
    return () => window.clearTimeout(id);
  }, []);

  const report = useCallback((o: Outcome) => {
    if (phaseRef.current !== 'live') return;
    go('reveal');
    const nextScore = applyOutcome(scoreRef.current, o);
    scoreRef.current = nextScore;
    setScore(nextScore);
    const scored = nextScore.history[nextScore.history.length - 1];
    setLast(scored);
    if (o.tier === 'perfect') play('perfect');
    else if (isSuccess(o.tier)) play('good');
    else play('miss');
    if (scored.multiplier > 1) window.setTimeout(() => play('combo'), 140);
  }, []);

  const next = useCallback(() => {
    if (phaseRef.current !== 'reveal') return;
    const elapsed = GAME_DURATION_MS - timeLeft.current;
    const ni = indexRef.current + 1;
    indexRef.current = ni;
    const c = makeChallenge(ni, elapsed);
    chLeftMs.current = c.limitMs;
    setIndex(ni);
    setChallenge(c);
    committed.current = false;
    setTimedOut(false);
    setChallengeLeft(1);
    go('live');
  }, [makeChallenge]);

  // Sport challenges advance on their own after a short reveal; business
  // challenges call next() when the player has read the explanation.
  useEffect(() => {
    if (phase !== 'reveal' || isBusiness(challenge.kind) || paused) return;
    const id = window.setTimeout(next, SPORT_REVEAL_MS);
    return () => window.clearTimeout(id);
  }, [phase, challenge.kind, paused, next]);

  const commit = useCallback(() => {
    committed.current = true;
  }, []);

  const business = isBusiness(challenge.kind);
  useFrame((_dt, _t, dt) => {
    const live = phaseRef.current === 'live';
    timeLeft.current = Math.max(0, timeLeft.current - dt);
    if (live && !committed.current) chLeftMs.current = Math.max(0, chLeftMs.current - dt);

    const shownTime = Math.ceil(timeLeft.current / 100) * 100;
    setTimeLeftMs((prev) => (prev === shownTime ? prev : shownTime));
    const frac = Math.round((chLeftMs.current / challenge.limitMs) * 200) / 200;
    setChallengeLeft((prev) => (prev === frac ? prev : frac));

    if (timeLeft.current <= 0) {
      go('timeup');
      play('end');
      return;
    }
    if (live && chLeftMs.current <= 0 && !committed.current) {
      committed.current = true;
      setTimedOut(true);
      report({ tier: 'miss', bonus: 0, reason: 'Temps écoulé' });
    }
  }, !paused && (phase === 'live' || (phase === 'reveal' && !business)));

  useEffect(() => {
    if (phase !== 'timeup') return;
    const id = window.setTimeout(() => onFinish(scoreRef.current), TIMEUP_MS);
    return () => window.clearTimeout(id);
  }, [phase, onFinish]);

  // Auto-pause when the tab or the iframe is hidden.
  useEffect(() => {
    const onVis = () => {
      if (document.hidden && phaseRef.current !== 'timeup') setPausedState(true);
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const getRemaining = useCallback(() => chLeftMs.current / challenge.limitMs, [challenge.limitMs]);

  return {
    phase,
    paused,
    timeLeftMs,
    challengeLeft,
    challenge,
    index,
    score,
    last,
    timedOut,
    setPaused: setPausedState,
    commit,
    report,
    next,
    getRemaining,
  };
}
