import { useEffect, useRef } from 'react';
import { BrandMark } from '../components/BrandMark';
import { HeroArt } from '../components/HeroArt';
import { SoundToggle } from '../components/SoundToggle';

export function Home({ best, onPlay }: { best: number; onPlay: () => void }) {
  const playRef = useRef<HTMLButtonElement>(null);
  useEffect(() => playRef.current?.focus({ preventScroll: true }), []);

  return (
    <div className="fsg-home">
      <header className="fsg-topbar">
        <BrandMark />
        <SoundToggle />
      </header>

      <div className="fsg-home-grid">
        <div className="fsg-home-copy">
          <p className="fsg-eyebrow">Mini-jeu arcade · 60 secondes</p>
          <h1 className="fsg-title">
            <span>FAST SPORT</span>
            <span className="fsg-title-sub">— THE GAME</span>
          </h1>
          <p className="fsg-tagline">Du sport. Du business. Du chaos.</p>

          <ul className="fsg-pills" aria-label="Au programme">
            <li>Basket</li>
            <li>Tennis</li>
            <li>Rugby</li>
            <li>Sponsors</li>
            <li>Anglais</li>
            <li>Droit</li>
          </ul>

          <div className="fsg-home-cta">
            <button ref={playRef} type="button" className="fsg-btn fsg-btn--primary fsg-btn--xl" onClick={onPlay}>
              PLAY NOW
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            {best > 0 && (
              <p className="fsg-best">
                <span>Record perso</span>
                <strong>{best.toLocaleString('fr-FR')}</strong>
              </p>
            )}
          </div>
          <p className="fsg-footnote">Souris, clavier ou tactile. Enchaîne les réussites pour activer le combo.</p>
        </div>

        <div className="fsg-home-art">
          <HeroArt />
        </div>
      </div>
    </div>
  );
}
