// Placeholder wordmark. To use the official Fast Sport logo, drop the SVG
// file in src/assets/ and render it here: every screen uses this component.
export function BrandMark({ size = 'md' }: { size?: 'sm' | 'md' }) {
  return (
    <span className={`fsg-brand fsg-brand--${size}`} aria-label="Fast Sport">
      <svg viewBox="0 0 32 32" aria-hidden="true" className="fsg-brand-glyph">
        <path d="M6 26 13 6h15l-3 6h-8l-1.5 4H24l-3 6h-6.5L13 26z" />
      </svg>
      <span className="fsg-brand-text">
        FAST<b>SPORT</b>
      </span>
    </span>
  );
}
