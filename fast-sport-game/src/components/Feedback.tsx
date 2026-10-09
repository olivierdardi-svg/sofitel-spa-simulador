import { tierLabel, isSuccess } from '../game/scoring';
import type { ScoredOutcome } from '../game/types';

/** Big result label shown over the stage after each challenge. */
export function Feedback({ outcome, compact }: { outcome: ScoredOutcome; compact: boolean }) {
  const ok = isSuccess(outcome.tier);
  return (
    <div className={`fsg-feedback fsg-feedback--${outcome.tier}` + (compact ? ' fsg-feedback--compact' : '')} role="status" aria-live="assertive">
      <span className="fsg-feedback-label">{tierLabel(outcome.tier)}</span>
      <span className="fsg-feedback-points">
        {outcome.points > 0 ? `+${outcome.points}` : '0'}
        {ok && outcome.multiplier > 1 && <em> COMBO x{outcome.multiplier}</em>}
      </span>
      <span className="fsg-feedback-reason">{outcome.reason}</span>
    </div>
  );
}
