import { useEffect, useRef, useState } from 'react';
import { BrandMark } from '../components/BrandMark';
import { SoundToggle } from '../components/SoundToggle';
import { rankFor, RANKS, isSuccess, type ScoreState } from '../game/scoring';
import { useReducedMotion } from '../lib/useReducedMotion';

export const SITE_URL = 'https://www.fast-sport.fr/';
/** Inputs still in flight from the last challenge (a Space pressed for a
 *  tennis return, a tap) must not trigger PLAY AGAIN and skip the results. */
const ARM_DELAY_MS = 700;

interface Props {
  result: ScoreState;
  best: number;
  isRecord: boolean;
  onReplay: () => void;
}

export function Results({ result, best, isRecord, onReplay }: Props) {
  const reduced = useReducedMotion();
  const rank = rankFor(result.score);
  const rankIndex = RANKS.indexOf(rank);
  const high = rankIndex >= 2;
  const [shown, setShown] = useState(reduced ? result.score : 0);
  const replayRef = useRef<HTMLButtonElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setArmed(true);
      replayRef.current?.focus({ preventScroll: true });
    }, ARM_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const start = performance.now();
    const dur = 900;
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / dur);
      setShown(Math.round(result.score * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [result.score, reduced]);

  const next = RANKS[rankIndex + 1];

  return (
    <div className={'fsg-results' + (high ? ' is-high' : '')}>
      <header className="fsg-topbar">
        <BrandMark />
        <SoundToggle />
      </header>

      <div className="fsg-results-body">
        <p className="fsg-eyebrow">Fin du match</p>
        <p className="fsg-results-rank">{rank.title}</p>
        <div className="fsg-results-score">
          <span className="fsg-results-num" aria-label={`Score final ${result.score}`}>
            {shown.toLocaleString('fr-FR')}
          </span>
          <span className="fsg-results-pts">pts</span>
          {isRecord && result.score > 0 && <span className="fsg-badge">Nouveau record</span>}
        </div>
        <p className="fsg-results-msg">
          {high ? rank.message : `${rank.message}${next ? ` Prochain rang : ${next.title} à ${next.min.toLocaleString('fr-FR')} pts.` : ''}`}
        </p>

        <dl className="fsg-stats">
          <div>
            <dt>Record perso</dt>
            <dd>{best.toLocaleString('fr-FR')}</dd>
          </div>
          <div>
            <dt>Défis réussis</dt>
            <dd>
              {result.successes}
              <small>/{result.played}</small>
            </dd>
          </div>
          <div>
            <dt>Meilleur combo</dt>
            <dd>{result.bestStreak}</dd>
          </div>
          <div>
            <dt>Perfects</dt>
            <dd>{result.perfects}</dd>
          </div>
        </dl>

        {result.history.length > 0 && (
          <ol className="fsg-timeline" aria-label="Résultat de chaque défi">
            {result.history.map((h, i) => (
              <li key={i} className={`is-${h.tier}`} title={`${h.reason} (${h.points > 0 ? '+' : ''}${h.points})`}>
                <span className="fsg-sr">
                  Défi {i + 1} : {isSuccess(h.tier) ? 'réussi' : 'raté'}, {h.points} points
                </span>
              </li>
            ))}
          </ol>
        )}

        <div className="fsg-results-cta">
          <button ref={replayRef} type="button" className="fsg-btn fsg-btn--primary fsg-btn--xl" onClick={() => armed && onReplay()}>
            PLAY AGAIN
          </button>
          <a
            className="fsg-btn fsg-btn--ghost fsg-btn--xl"
            href={SITE_URL}
            target="_top"
            rel="noopener"
            onClick={(e) => {
              if (!armed) e.preventDefault();
            }}
          >
            DISCOVER FAST SPORT
          </a>
        </div>
      </div>
    </div>
  );
}
