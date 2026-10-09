import type { Quality } from '../data/business';
import type { Outcome, ScoredOutcome, Tier } from './types';

export const BASE_POINTS: Record<Tier, number> = {
  perfect: 150,
  good: 100,
  ok: 50,
  almost: 25,
  miss: 0,
};

/** Tiers that count as a success: they extend the combo. */
export function isSuccess(tier: Tier): boolean {
  return tier === 'perfect' || tier === 'good' || tier === 'ok';
}

/** Combo multiplier for a given streak of consecutive successes. */
export function multiplierFor(streak: number): number {
  if (streak >= 6) return 4;
  if (streak >= 4) return 3;
  if (streak >= 2) return 2;
  return 1;
}

export interface ScoreState {
  score: number;
  streak: number;
  bestStreak: number;
  played: number;
  successes: number;
  perfects: number;
  history: ScoredOutcome[];
}

export const initialScore: ScoreState = {
  score: 0,
  streak: 0,
  bestStreak: 0,
  played: 0,
  successes: 0,
  perfects: 0,
  history: [],
};

/**
 * Applies one challenge outcome. Successes grow the streak and are
 * multiplied by the combo; "almost" gives flat partial points and, like a
 * miss, resets the combo.
 */
export function applyOutcome(state: ScoreState, outcome: Outcome): ScoreState {
  const success = isSuccess(outcome.tier);
  const streak = success ? state.streak + 1 : 0;
  const multiplier = success ? multiplierFor(streak) : 1;
  const bonus = success ? Math.max(0, Math.round(outcome.bonus)) : 0;
  const points = (BASE_POINTS[outcome.tier] + bonus) * multiplier;
  const scored: ScoredOutcome = { ...outcome, bonus, points, multiplier, streak };
  return {
    score: state.score + points,
    streak,
    bestStreak: Math.max(state.bestStreak, streak),
    played: state.played + 1,
    successes: state.successes + (success ? 1 : 0),
    perfects: state.perfects + (outcome.tier === 'perfect' ? 1 : 0),
    history: [...state.history, scored],
  };
}

/**
 * Business answers: the best one earns a speed bonus (share of the
 * challenge time left) and is PERFECT if given in the first half.
 */
export function businessOutcome(quality: Quality, remaining: number): Outcome {
  if (quality === 'best') {
    const r = Math.max(0, Math.min(1, remaining));
    const bonus = Math.round(50 * r);
    return { tier: r >= 0.5 ? 'perfect' : 'good', bonus, reason: `Meilleure option · rapidité +${bonus}` };
  }
  if (quality === 'almost') return { tier: 'almost', bonus: 0, reason: 'Défendable, mais pas la meilleure' };
  return { tier: 'miss', bonus: 0, reason: 'Mauvais choix' };
}

export interface Rank {
  id: string;
  title: string;
  min: number;
  message: string;
}

export const RANKS: Rank[] = [
  { id: 'rookie', title: 'Rookie', min: 0, message: 'Premier match, premiers réflexes. La revanche se joue maintenant.' },
  { id: 'rising', title: 'Rising Talent', min: 1200, message: 'Le potentiel est là. Encore une partie pour passer pro.' },
  { id: 'pro', title: 'Sport Business Pro', min: 2600, message: 'Réflexes, sponsors, contrats : tu gères le terrain et le bureau.' },
  { id: 'legend', title: 'Fast Sport Legend', min: 4200, message: 'Performance de légende. Les sponsors t’appellent déjà.' },
];

export function rankFor(score: number): Rank {
  let rank = RANKS[0];
  for (const r of RANKS) if (score >= r.min) rank = r;
  return rank;
}

export function tierLabel(tier: Tier): string {
  switch (tier) {
    case 'perfect': return 'PERFECT!';
    case 'good': return 'NICE!';
    case 'ok': return 'GOOD';
    case 'almost': return 'ALMOST';
    case 'miss': return 'MISS';
  }
}
