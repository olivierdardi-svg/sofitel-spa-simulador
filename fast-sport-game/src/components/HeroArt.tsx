/** Multisport composition for the home screen (pure SVG, no images). */
export function HeroArt() {
  return (
    <svg className="fsg-hero-art" viewBox="0 0 420 420" role="img" aria-label="Ballons de basket, de tennis et de rugby en mouvement">
      <defs>
        <clipPath id="fsg-hero-clip">
          <circle cx="210" cy="210" r="190" />
        </clipPath>
      </defs>
      <circle cx="210" cy="210" r="190" className="fsg-hero-disc" />
      <g clipPath="url(#fsg-hero-clip)" className="fsg-hero-lines">
        <path d="M20 300 L400 120" />
        <path d="M20 330 L400 150" />
        <circle cx="210" cy="210" r="120" />
        <line x1="210" y1="0" x2="210" y2="420" />
      </g>

      {/* speed streaks */}
      <g className="fsg-hero-streaks">
        <path d="M40 128 H150" />
        <path d="M70 146 H160" />
        <path d="M250 320 H390" />
        <path d="M290 338 H380" />
      </g>

      {/* rugby ball */}
      <g className="fsg-float fsg-float--a" transform="translate(300 128) rotate(-32)">
        <ellipse rx="46" ry="74" className="fsg-hero-rugby" />
        <path d="M0 -40 V40 M-8 -24 H8 M-8 -10 H8 M-8 4 H8 M-8 18 H8" className="fsg-hero-seam fsg-hero-seam--light" />
      </g>

      {/* basketball */}
      <g className="fsg-float fsg-float--b" transform="translate(180 236)">
        <circle r="92" className="fsg-hero-basket" />
        <path d="M-92 0 H92 M0 -92 V92 M-64 -66 Q-10 0 -64 66 M64 -66 Q10 0 64 66" className="fsg-hero-seam" />
      </g>

      {/* tennis ball */}
      <g className="fsg-float fsg-float--c" transform="translate(318 300)">
        <circle r="38" className="fsg-hero-tennis" />
        <path d="M-30 -24 Q0 0 -30 24 M30 -24 Q0 0 30 24" className="fsg-hero-seam fsg-hero-seam--light" />
      </g>
    </svg>
  );
}
