import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export interface ParticlesHandle {
  /** x, y in 0..1 relative to the canvas. */
  burst: (x: number, y: number, count: number, colors: string[]) => void;
}

interface P { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; color: string; rot: number; vr: number }

/** Lightweight confetti canvas. Disabled entirely with reduced motion. */
export const Particles = forwardRef<ParticlesHandle, { disabled: boolean }>(function Particles({ disabled }, ref) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const parts = useRef<P[]>([]);
  const raf = useRef(0);

  const loop = () => {
    const c = canvas.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = c.clientWidth;
    const h = c.clientHeight;
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    parts.current = parts.current.filter((p) => p.life < p.max);
    for (const p of parts.current) {
      p.life += 16;
      p.vy += 0.18;
      p.vx *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.globalAlpha = 1 - p.life / p.max;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    }
    raf.current = parts.current.length ? requestAnimationFrame(loop) : 0;
  };

  useImperativeHandle(ref, () => ({
    burst(x, y, count, colors) {
      const c = canvas.current;
      if (disabled || !c) return;
      const px = x * c.clientWidth;
      const py = y * c.clientHeight;
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = 2 + Math.random() * 5;
        parts.current.push({
          x: px, y: py, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 3,
          life: 0, max: 600 + Math.random() * 500, size: 5 + Math.random() * 6,
          color: colors[i % colors.length], rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
        });
      }
      if (!raf.current) raf.current = requestAnimationFrame(loop);
    },
  }));

  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return <canvas ref={canvas} className="fsg-particles" aria-hidden="true" />;
});
