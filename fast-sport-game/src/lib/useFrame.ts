import { useEffect, useRef } from 'react';

/**
 * Calls `cb(dt, t, realDt)` every animation frame while `active` is true.
 * - `t` is the time accumulated while active (ms): pausing freezes every
 *   animation driven by it.
 * - `dt` is capped at 50 ms so a slow frame never makes a ball skip
 *   through a timing window.
 * - `realDt` is the uncapped wall-clock delta (bounded to 1 s), used by
 *   the game clock so that 60 s of play are 60 real seconds even on a
 *   slow device.
 */
export function useFrame(cb: (dt: number, t: number, realDt: number) => void, active: boolean): void {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  const tRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let last = -1;
    const loop = (now: number) => {
      // The first timestamp only sets the reference: rAF timestamps can be
      // slightly earlier than a performance.now() taken before them.
      const real = last < 0 ? 0 : Math.min(1000, Math.max(0, now - last));
      last = now;
      const dt = Math.min(50, real);
      tRef.current += dt;
      cbRef.current(dt, tRef.current, real);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active]);
}
