export type Tier = 'perfect' | 'good' | 'ok' | 'almost' | 'miss';

export type SportKind = 'basket' | 'tennis' | 'rugby';
export type BusinessKind = 'sponsor' | 'english' | 'law';
export type ChallengeKind = SportKind | BusinessKind;

/** What a challenge reports once the player's action is resolved. */
export interface Outcome {
  tier: Tier;
  /** Extra points earned for precision or speed (before multiplier). */
  bonus: number;
  /** Very short reason shown to the player, e.g. "Swish !" or "Bloqué". */
  reason: string;
}

export interface ScoredOutcome extends Outcome {
  points: number;
  multiplier: number;
  streak: number;
}

export interface ChallengeSpec {
  id: string;
  kind: ChallengeKind;
  /** 0 (start of the game) to 1 (last seconds). */
  difficulty: number;
}
