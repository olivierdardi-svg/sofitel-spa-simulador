import { describe, expect, it } from 'vitest';
import { applyOutcome, initialScore, multiplierFor, rankFor, RANKS } from '../src/game/scoring';
import type { Outcome } from '../src/game/types';

const win = (bonus = 0): Outcome => ({ tier: 'good', bonus, reason: '' });
const miss: Outcome = { tier: 'miss', bonus: 0, reason: '' };

describe('scoring', () => {
  it('gives base + bonus points for a success', () => {
    const s = applyOutcome(initialScore, { tier: 'perfect', bonus: 30, reason: '' });
    expect(s.score).toBe(180);
    expect(s.perfects).toBe(1);
    expect(s.successes).toBe(1);
  });

  it('builds a combo multiplier on consecutive successes', () => {
    let s = initialScore;
    const gains: number[] = [];
    for (let i = 0; i < 7; i++) {
      const before = s.score;
      s = applyOutcome(s, win());
      gains.push(s.score - before);
    }
    expect(gains).toEqual([100, 200, 200, 300, 300, 400, 400]);
    expect(s.bestStreak).toBe(7);
  });

  it('resets the combo on a miss and on an "almost"', () => {
    let s = applyOutcome(applyOutcome(initialScore, win()), win());
    expect(s.streak).toBe(2);
    s = applyOutcome(s, miss);
    expect(s.streak).toBe(0);
    s = applyOutcome(applyOutcome(s, win()), win());
    const before = s.score;
    s = applyOutcome(s, { tier: 'almost', bonus: 99, reason: '' });
    expect(s.streak).toBe(0);
    expect(s.score - before).toBe(25); // flat, no bonus, no multiplier
    expect(s.bestStreak).toBe(2);
  });

  it('ignores bonus on a miss and never removes points', () => {
    const s = applyOutcome(initialScore, { tier: 'miss', bonus: 50, reason: '' });
    expect(s.score).toBe(0);
  });

  it('caps the multiplier at x4', () => {
    expect(multiplierFor(1)).toBe(1);
    expect(multiplierFor(2)).toBe(2);
    expect(multiplierFor(4)).toBe(3);
    expect(multiplierFor(20)).toBe(4);
  });

  it('maps scores to ranks in order', () => {
    expect(rankFor(0).title).toBe('Rookie');
    for (const r of RANKS) expect(rankFor(r.min).id).toBe(r.id);
    expect(rankFor(99999).title).toBe('Fast Sport Legend');
  });
});
