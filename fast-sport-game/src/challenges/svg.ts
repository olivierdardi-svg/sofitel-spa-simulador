import type { PointerEvent as ReactPointerEvent } from 'react';

/** Converts a pointer position to the SVG's viewBox coordinates. */
export function svgPoint(svg: SVGSVGElement, e: ReactPointerEvent | PointerEvent): { x: number; y: number } {
  const ctm = svg.getScreenCTM();
  if (!ctm) return { x: 0, y: 0 };
  const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
  return { x: p.x, y: p.y };
}

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeOut = (t: number) => 1 - (1 - t) * (1 - t);

/** Keyboard shortcut helper that ignores repeats and typing in fields. */
export function isActionKey(e: KeyboardEvent): boolean {
  return (e.code === 'Space' || e.code === 'Enter') && !e.repeat;
}
