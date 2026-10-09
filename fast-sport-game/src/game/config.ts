import type { ChallengeKind } from './types';

export const GAME_DURATION_MS = 60_000;
/** Pause on the result of a sport challenge before the next one starts. */
export const SPORT_REVEAL_MS = 600;
/** Business explanations stay until the player continues, or this delay. */
export const BUSINESS_REVEAL_MS = 4200;

/** Time limit of a single challenge (ms), tightened by difficulty. */
export function challengeLimit(kind: ChallengeKind, difficulty: number): number {
  const base: Record<ChallengeKind, number> = {
    basket: 6500,
    tennis: 9000,
    rugby: 7000,
    sponsor: 8500,
    english: 8000,
    law: 9000,
  };
  return Math.round(base[kind] * (1 - 0.2 * difficulty));
}

export const MISSIONS: Record<ChallengeKind, { title: string; tag: string; hint: string; hintKeys: string }> = {
  basket: { title: 'SHOOT!', tag: 'Basketball', hint: 'Vise le panier, évite le défenseur', hintKeys: '← → pour viser · Espace pour tirer' },
  tennis: { title: 'PERFECT TIMING', tag: 'Tennis', hint: 'Frappe quand la balle entre dans la zone', hintKeys: 'Espace au bon moment' },
  rugby: { title: 'KICK IT!', tag: 'Rugby', hint: 'Bloque la direction, puis la puissance', hintKeys: 'Espace deux fois' },
  sponsor: { title: 'SPONSOR PANIC', tag: 'Marketing sportif', hint: 'Choisis la meilleure activation', hintKeys: 'Touches 1 · 2 · 3' },
  english: { title: 'LOST IN TRANSLATION', tag: 'Anglais du sport', hint: 'Choisis la bonne formule', hintKeys: 'Touches 1 · 2 · 3' },
  law: { title: 'CONTRACT CRISIS', tag: 'Droit du sport', hint: 'Choisis la bonne réaction', hintKeys: 'Touches 1 · 2 · 3' },
};
