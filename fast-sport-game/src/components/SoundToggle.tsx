import { useEffect, useState } from 'react';
import { isSoundOn, onSoundChange, setSound } from '../audio/sfx';

export function SoundToggle() {
  const [on, setOn] = useState(isSoundOn());
  useEffect(() => onSoundChange(setOn), []);
  return (
    <button
      type="button"
      className="fsg-icon-btn"
      onClick={() => setSound(!on)}
      aria-pressed={on}
      aria-label={on ? 'Couper le son' : 'Activer le son'}
      title={on ? 'Couper le son (M)' : 'Activer le son (M)'}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 9v6h4l5 4V5L8 9H4z" />
        {on ? <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" /> : <path d="M17 9l5 6M22 9l-5 6" />}
      </svg>
    </button>
  );
}
