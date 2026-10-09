import { GAME_DURATION_MS, MISSIONS } from '../game/config';
import { multiplierFor } from '../game/scoring';
import type { ChallengeKind } from '../game/types';

interface Props {
  kind: ChallengeKind;
  index: number;
  timeLeftMs: number;
  score: number;
  streak: number;
}

export function Hud({ kind, index, timeLeftMs, score, streak }: Props) {
  const m = MISSIONS[kind];
  const secs = Math.ceil(timeLeftMs / 1000);
  const mult = multiplierFor(streak);
  const urgent = secs <= 10;
  return (
    <header className="fsg-hud">
      <div className="fsg-hud-mission" key={index}>
        <span className="fsg-hud-tag">
          Défi {String(index + 1).padStart(2, '0')} · {m.tag}
        </span>
        <span className="fsg-hud-title">{m.title}</span>
        <span className="fsg-hud-hint">
          {m.hint}
          <span className="fsg-hud-keys"> · {m.hintKeys}</span>
        </span>
      </div>
      <div className="fsg-hud-stats">
        <div className={'fsg-hud-time' + (urgent ? ' is-urgent' : '')} aria-label={`${secs} secondes restantes`}>
          <span className="fsg-hud-num">{secs}</span>
          <span className="fsg-hud-unit">s</span>
        </div>
        <div className="fsg-hud-score" aria-live="off">
          <span className="fsg-hud-label">Score</span>
          <span className="fsg-hud-num">{score.toLocaleString('fr-FR')}</span>
        </div>
        <div className={'fsg-hud-combo' + (mult > 1 ? ' is-on' : '')} aria-label={`Combo multiplicateur ${mult}`}>
          x{mult}
        </div>
      </div>
      <div className="fsg-hud-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${timeLeftMs / GAME_DURATION_MS})` }} />
      </div>
    </header>
  );
}
