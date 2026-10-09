import { memo, useEffect, useRef, useState } from 'react';
import { LAW_DISCLAIMER, type Scenario } from '../data/business';
import { BUSINESS_REVEAL_MS } from '../game/config';
import { businessOutcome } from '../game/scoring';
import { shuffle } from '../game/sequence';
import type { BusinessKind, Outcome } from '../game/types';
import { useFrame } from '../lib/useFrame';

interface Props {
  scenario: Scenario;
  active: boolean;
  paused: boolean;
  timedOut: boolean;
  getRemaining: () => number;
  onCommit: () => void;
  onResult: (o: Outcome) => void;
  onDone: () => void;
}

const KEYS = ['1', '2', '3'];

function ChoiceChallenge({ scenario, active, paused, timedOut, getRemaining, onCommit, onResult, onDone }: Props) {
  const [choices] = useState(() => shuffle(scenario.choices));
  const [picked, setPicked] = useState<number | null>(null);
  const [revealT, setRevealT] = useState(0);
  const doneRef = useRef(false);
  const continueRef = useRef<HTMLButtonElement>(null);
  const revealed = picked !== null || timedOut;

  const select = (i: number) => {
    if (!active || picked !== null || timedOut) return;
    setPicked(i);
    onCommit();
    onResult(businessOutcome(choices[i].quality, getRemaining()));
  };

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  const revealAcc = useRef(0);
  useFrame((dt) => {
    revealAcc.current += dt;
    setRevealT(revealAcc.current);
    if (revealAcc.current >= BUSINESS_REVEAL_MS) finish();
  }, revealed && !paused && !doneRef.current);

  useEffect(() => {
    if (revealed) continueRef.current?.focus({ preventScroll: true });
  }, [revealed]);

  const handlers = useRef({ select, finish, revealed });
  handlers.current = { select, finish, revealed };
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const h = handlers.current;
      const idx = KEYS.indexOf(e.key);
      if (!h.revealed && idx >= 0) {
        e.preventDefault();
        h.select(idx);
      } else if (h.revealed && (e.code === 'Space' || e.code === 'Enter')) {
        e.preventDefault();
        h.finish();
      }
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);

  const stateOf = (i: number) => {
    if (!revealed) return '';
    const q = choices[i].quality;
    if (q === 'best') return ' is-best';
    if (i === picked) return q === 'almost' ? ' is-almost' : ' is-wrong';
    return ' is-dim';
  };

  const verdict = timedOut
    ? 'Temps écoulé'
    : picked === null
      ? ''
      : choices[picked].quality === 'best'
        ? 'Bien joué'
        : choices[picked].quality === 'almost'
          ? 'Presque'
          : 'Raté';

  return (
    <div className={`fsg-choice fsg-choice--${scenario.kind}`}>
      <div className="fsg-choice-head">
        <span className="fsg-choice-icon" aria-hidden="true">
          <KindIcon kind={scenario.kind} />
        </span>
        <p className="fsg-choice-context">{scenario.context}</p>
      </div>
      <h2 className="fsg-choice-prompt">{scenario.prompt}</h2>

      <ol className="fsg-choice-list">
        {choices.map((c, i) => (
          <li key={c.text}>
            <button
              type="button"
              className={'fsg-option' + stateOf(i)}
              onClick={() => select(i)}
              disabled={revealed || !active}
              aria-keyshortcuts={KEYS[i]}
              lang={scenario.kind === 'english' ? 'en' : undefined}
            >
              <span className="fsg-option-key" aria-hidden="true">{KEYS[i]}</span>
              <span className="fsg-option-text">{c.text}</span>
            </button>
          </li>
        ))}
      </ol>

      {revealed && (
        <div className="fsg-explain" role="status">
          <p className="fsg-explain-text">
            <strong>{verdict}.</strong> {scenario.explain}
          </p>
          {scenario.kind === 'law' && <p className="fsg-explain-legal">{LAW_DISCLAIMER}</p>}
          <button ref={continueRef} type="button" className="fsg-btn fsg-btn--ghost fsg-explain-next" onClick={finish}>
            Suivant
            <span className="fsg-explain-progress" style={{ transform: `scaleX(${Math.min(1, revealT / BUSINESS_REVEAL_MS)})` }} />
          </button>
        </div>
      )}
    </div>
  );
}

function KindIcon({ kind }: { kind: BusinessKind }) {
  const common = { width: 28, height: 28, viewBox: '0 0 32 32', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (kind === 'sponsor')
    return (
      <svg {...common}>
        <path d="M5 13v6h4l10 6V7L9 13H5z" />
        <path d="M23 11a6 6 0 0 1 0 10M26 8a10 10 0 0 1 0 16" />
      </svg>
    );
  if (kind === 'english')
    return (
      <svg {...common}>
        <path d="M4 6h16v11H11l-5 4v-4H4z" />
        <path d="M14 21v2h9l5 4v-4h0V12h-4" />
        <path d="M9 10h6M9 13h4" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M8 4h12l5 5v19H8z" />
      <path d="M20 4v5h5M12 14h9M12 18h9M12 22h5" />
    </svg>
  );
}

export default memo(ChoiceChallenge);
