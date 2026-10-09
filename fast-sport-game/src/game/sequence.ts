import type { BusinessKind, ChallengeKind, SportKind } from './types';

export const SPORT_KINDS: SportKind[] = ['basket', 'tennis', 'rugby'];
export const BUSINESS_KINDS: BusinessKind[] = ['sponsor', 'english', 'law'];

export function isBusiness(kind: ChallengeKind): kind is BusinessKind {
  return (BUSINESS_KINDS as string[]).includes(kind);
}

export function shuffle<T>(items: readonly T[], rand: () => number = Math.random): T[] {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Builds the order of challenges: sport and business strictly alternate,
 * and each family cycles through all its kinds before repeating one, so a
 * kind never appears twice in a row.
 */
export function buildSequence(length: number, rand: () => number = Math.random): ChallengeKind[] {
  const take = <T,>(pool: readonly T[]) => {
    let bag: T[] = [];
    let last: T | undefined;
    return () => {
      if (bag.length === 0) {
        bag = shuffle(pool, rand);
        if (bag[0] === last && bag.length > 1) [bag[0], bag[1]] = [bag[1], bag[0]];
      }
      last = bag.shift()!;
      return last;
    };
  };
  const nextSport = take(SPORT_KINDS);
  const nextBusiness = take(BUSINESS_KINDS);
  const out: ChallengeKind[] = [];
  for (let i = 0; i < length; i++) out.push(i % 2 === 0 ? nextSport() : nextBusiness());
  return out;
}

/** Difficulty grows with elapsed time; clamped to [0, 1]. */
export function difficultyAt(elapsedMs: number, totalMs: number): number {
  return Math.min(1, Math.max(0, elapsedMs / totalMs));
}
