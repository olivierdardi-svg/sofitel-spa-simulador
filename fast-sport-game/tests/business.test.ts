import { describe, expect, it } from 'vitest';
import { SCENARIOS, scenariosOf } from '../src/data/business';
import { businessOutcome as outcomeFor } from '../src/game/scoring';
import { BUSINESS_KINDS } from '../src/game/sequence';

describe('business scenarios', () => {
  it('each has at most 3 choices and exactly one best answer', () => {
    for (const s of SCENARIOS) {
      expect(s.choices.length).toBeGreaterThanOrEqual(2);
      expect(s.choices.length).toBeLessThanOrEqual(3);
      expect(s.choices.filter((c) => c.quality === 'best')).toHaveLength(1);
      expect(new Set(s.choices.map((c) => c.text)).size).toBe(s.choices.length);
      expect(s.explain.length).toBeGreaterThan(20);
    }
  });

  it('has unique ids and enough content per kind for a game', () => {
    expect(new Set(SCENARIOS.map((s) => s.id)).size).toBe(SCENARIOS.length);
    for (const k of BUSINESS_KINDS) expect(scenariosOf(k).length).toBeGreaterThanOrEqual(5);
  });

  it('rewards speed only on the best answer', () => {
    expect(outcomeFor('best', 1)).toMatchObject({ tier: 'perfect', bonus: 50 });
    expect(outcomeFor('best', 0.3)).toMatchObject({ tier: 'good', bonus: 15 });
    expect(outcomeFor('almost', 1)).toMatchObject({ tier: 'almost', bonus: 0 });
    expect(outcomeFor('bad', 1)).toMatchObject({ tier: 'miss', bonus: 0 });
  });
});
