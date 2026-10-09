import type { Outcome } from '../game/types';

export interface SportChallengeProps {
  difficulty: number;
  /** true while the challenge is playable (live phase and not paused). */
  active: boolean;
  /** true while the clocks are stopped by pause. Animations must freeze. */
  paused: boolean;
  /** The challenge timer ran out before the player acted. */
  timedOut: boolean;
  /** Called when the action is taken: stops the challenge timer. */
  onCommit: () => void;
  /** Called once with the result. */
  onResult: (o: Outcome) => void;
}
