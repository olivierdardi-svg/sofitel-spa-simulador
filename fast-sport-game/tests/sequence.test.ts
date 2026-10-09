import { describe, expect, it } from 'vitest';
import { challengeLimit, MISSIONS } from '../src/game/config';
import { BUSINESS_KINDS, buildSequence, difficultyAt, isBusiness, SPORT_KINDS } from '../src/game/sequence';

function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

describe('sequence', () => {
  it('alternates sport and business, starting with sport', () => {
    for (let seed = 1; seed < 50; seed++) {
      const seq = buildSequence(30, seeded(seed));
      seq.forEach((k, i) => expect(isBusiness(k)).toBe(i % 2 === 1));
    }
  });

  it('never repeats the same kind twice in its family', () => {
    for (let seed = 1; seed < 200; seed++) {
      const seq = buildSequence(30, seeded(seed));
      const sports = seq.filter((_, i) => i % 2 === 0);
      const biz = seq.filter((_, i) => i % 2 === 1);
      for (const fam of [sports, biz]) for (let i = 1; i < fam.length; i++) expect(fam[i]).not.toBe(fam[i - 1]);
    }
  });

  it('uses every kind within the first two cycles', () => {
    const seq = buildSequence(6, seeded(7));
    expect(new Set(seq)).toEqual(new Set([...SPORT_KINDS, ...BUSINESS_KINDS]));
  });

  it('clamps difficulty and tightens time limits', () => {
    expect(difficultyAt(-5, 60000)).toBe(0);
    expect(difficultyAt(30000, 60000)).toBe(0.5);
    expect(difficultyAt(90000, 60000)).toBe(1);
    for (const k of [...SPORT_KINDS, ...BUSINESS_KINDS]) {
      expect(challengeLimit(k, 1)).toBeLessThan(challengeLimit(k, 0));
      expect(challengeLimit(k, 1)).toBeGreaterThanOrEqual(5000);
      expect(MISSIONS[k].title.length).toBeGreaterThan(0);
    }
  });
});
