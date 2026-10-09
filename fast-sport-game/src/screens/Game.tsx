import { useEffect, useRef, useState } from 'react';
import Basketball from '../challenges/Basketball';
import ChoiceChallenge from '../challenges/ChoiceChallenge';
import Rugby from '../challenges/Rugby';
import Tennis from '../challenges/Tennis';
import { BrandMark } from '../components/BrandMark';
import { Feedback } from '../components/Feedback';
import { Hud } from '../components/Hud';
import { Particles, type ParticlesHandle } from '../components/Particles';
import { SoundToggle } from '../components/SoundToggle';
import { isSuccess, type ScoreState } from '../game/scoring';
import { isBusiness } from '../game/sequence';
import { useGameSession } from '../game/useGameSession';
import { useReducedMotion } from '../lib/useReducedMotion';

interface Props {
  onFinish: (score: ScoreState) => void;
  onRestart: () => void;
  onQuit: () => void;
}

const CONFETTI = ['var(--fsg-accent)', '#ffffff', 'var(--fsg-blue)'];

export function Game({ onFinish, onRestart, onQuit }: Props) {
  const g = useGameSession(onFinish);
  const reduced = useReducedMotion();
  const particles = useRef<ParticlesHandle>(null);
  const resumeRef = useRef<HTMLButtonElement>(null);
  const { challenge, phase, paused } = g;
  const business = isBusiness(challenge.kind);
  const active = phase === 'live' && !paused;
  const [go, setGo] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setGo(true), 650);
    return () => window.clearTimeout(id);
  }, []);

  // Confetti on success, read from CSS custom properties at burst time.
  useEffect(() => {
    if (!g.last || phase !== 'reveal' || !isSuccess(g.last.tier)) return;
    const root = document.querySelector('.fsg-app');
    const css = root ? getComputedStyle(root) : null;
    const colors = CONFETTI.map((c) => (c.startsWith('var(') && css ? css.getPropertyValue(c.slice(4, -1)).trim() || '#fff' : c));
    particles.current?.burst(business ? 0.8 : 0.5, business ? 0.06 : 0.38, g.last.tier === 'perfect' ? 46 : 22, colors);
  }, [g.last, phase, business]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === 'Escape' || e.code === 'KeyP') {
        if (phase === 'timeup') return;
        e.preventDefault();
        g.setPaused(!paused);
      }
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, [paused, phase, g]);

  useEffect(() => {
    if (paused) resumeRef.current?.focus({ preventScroll: true });
  }, [paused]);

  const common = {
    difficulty: challenge.difficulty,
    active,
    paused,
    timedOut: g.timedOut,
    onCommit: g.commit,
    onResult: g.report,
  };

  return (
    <div className="fsg-game">
      <Hud kind={challenge.kind} index={g.index} timeLeftMs={g.timeLeftMs} score={g.score.score} streak={g.score.streak} />
      <div className="fsg-chtimer" aria-hidden="true">
        <span className={g.challengeLeft < 0.3 ? 'is-low' : ''} style={{ transform: `scaleX(${g.challengeLeft})` }} />
      </div>

      <main
        className={'fsg-stage' + (business ? ' fsg-stage--business' : ' fsg-stage--sport')}
        aria-label="Zone de jeu"
      >
        <div className="fsg-stage-inner fsg-enter" key={challenge.key}>
          {challenge.kind === 'basket' && <Basketball {...common} />}
          {challenge.kind === 'tennis' && <Tennis {...common} />}
          {challenge.kind === 'rugby' && <Rugby {...common} />}
          {business && challenge.scenario && (
            <ChoiceChallenge
              scenario={challenge.scenario}
              active={active}
              paused={paused}
              timedOut={g.timedOut}
              getRemaining={g.getRemaining}
              onCommit={g.commit}
              onResult={g.report}
              onDone={g.next}
            />
          )}
        </div>

        <Particles ref={particles} disabled={reduced} />

        {phase === 'reveal' && g.last && <Feedback key={g.score.played} outcome={g.last} compact={business} />}

        {phase === 'intro' && (
          <div className="fsg-overlay fsg-overlay--clear" aria-live="assertive">
            <span className={'fsg-countdown' + (go ? ' is-go' : '')} key={go ? 'go' : 'ready'}>
              {go ? 'GO!' : 'READY'}
            </span>
          </div>
        )}
        {phase === 'timeup' && (
          <div className="fsg-overlay" aria-live="assertive">
            <span className="fsg-countdown">TIME!</span>
          </div>
        )}
        {paused && phase !== 'timeup' && (
          <div className="fsg-overlay fsg-pause" role="dialog" aria-modal="true" aria-label="Pause">
            <p className="fsg-pause-title">PAUSE</p>
            <p className="fsg-pause-sub">Le chrono est arrêté.</p>
            <div className="fsg-pause-actions">
              <button ref={resumeRef} type="button" className="fsg-btn fsg-btn--primary" onClick={() => g.setPaused(false)}>
                Reprendre
              </button>
              <button type="button" className="fsg-btn fsg-btn--ghost" onClick={onRestart}>
                Recommencer
              </button>
              <button type="button" className="fsg-btn fsg-btn--link" onClick={onQuit}>
                Quitter
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="fsg-gamebar">
        <BrandMark size="sm" />
        <div className="fsg-gamebar-actions">
          <button
            type="button"
            className="fsg-icon-btn"
            onClick={() => g.setPaused(!paused)}
            aria-label={paused ? 'Reprendre' : 'Mettre en pause'}
            title="Pause (Échap)"
            disabled={phase === 'timeup'}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM13 5h4v14h-4z" />}
            </svg>
          </button>
          <SoundToggle />
        </div>
      </footer>
    </div>
  );
}
