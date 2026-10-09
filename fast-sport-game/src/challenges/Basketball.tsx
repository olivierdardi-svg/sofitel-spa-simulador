import { memo, useEffect, useReducer, useRef } from 'react';
import { play } from '../audio/sfx';
import { useFrame } from '../lib/useFrame';
import { clamp, isActionKey, lerp, svgPoint } from './svg';
import type { SportChallengeProps } from './types';

// Scene coordinates (viewBox 400 x 320)
const BALL_X = 200;
const BALL_Y = 292;
const RIM_Y = 104;
const FLIGHT_MS = 720;
/** Fraction of the flight at which the ball passes the defender's hands. */
const BLOCK_T = 0.2;
const DEF_REACH = 24;
const PERFECT_DX = 7;
const GOOD_DX = 16;

interface Shot {
  aimX: number;
  start: number;
  blockedAt: number | null;
  /** x of the hoop when the ball arrived (for the post-animation). */
  landHoopX: number | null;
  result: 'in' | 'out' | null;
}

function bezier(aimX: number, f: number) {
  // Quadratic curve: start -> high control point -> rim height at aimX
  const cx = (BALL_X + aimX) / 2;
  const cy = -40;
  const u = 1 - f;
  return {
    x: u * u * BALL_X + 2 * u * f * cx + f * f * aimX,
    y: u * u * BALL_Y + 2 * u * f * cy + f * f * RIM_Y,
  };
}

function Basketball({ difficulty, active, paused, timedOut, onCommit, onResult }: SportChallengeProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [, render] = useReducer((n: number) => n + 1, 0);
  const t = useRef(0);
  const aim = useRef(200);
  const keys = useRef({ left: false, right: false });
  const shot = useRef<Shot | null>(null);
  const pointerDown = useRef(false);

  const hoopAmp = difficulty < 0.2 ? 0 : lerp(35, 95, (difficulty - 0.2) / 0.8);
  const hoopX = (time: number) => 200 + Math.sin(time * 0.0013 * (1 + difficulty * 0.6)) * hoopAmp;
  const defX = (time: number) => 200 + Math.sin(time * 0.0019 * (1 + difficulty * 0.9) + 1.3) * 112;

  const shoot = () => {
    if (!active || shot.current) return;
    play('tap');
    onCommit();
    const aimX = aim.current;
    shot.current = { aimX, start: t.current, blockedAt: null, landHoopX: null, result: null };
  };

  useFrame((dt, now) => {
    t.current = now;
    if (!shot.current && active) {
      const k = keys.current;
      if (k.left !== k.right) aim.current = clamp(aim.current + (k.right ? 1 : -1) * dt * 0.3, 40, 360);
    }
    const s = shot.current;
    if (s) {
      const f = (now - s.start) / FLIGHT_MS;
      if (s.blockedAt === null && s.result === null && f >= BLOCK_T) {
        const bx = bezier(s.aimX, BLOCK_T).x;
        if (Math.abs(bx - defX(s.start + BLOCK_T * FLIGHT_MS)) < DEF_REACH) {
          s.blockedAt = now;
          s.result = 'out';
          onResult({ tier: 'miss', bonus: 0, reason: 'Contré par le défenseur' });
        }
      }
      if (s.result === null && f >= 1) {
        const hx = hoopX(now);
        const dx = Math.abs(s.aimX - hx);
        s.landHoopX = hx;
        if (dx <= GOOD_DX) {
          s.result = 'in';
          const bonus = Math.round((1 - dx / GOOD_DX) * 50);
          onResult(
            dx <= PERFECT_DX
              ? { tier: 'perfect', bonus, reason: 'Swish ! Plein centre' }
              : { tier: 'good', bonus, reason: 'Panier, précision +' + bonus },
          );
        } else {
          s.result = 'out';
          onResult({ tier: 'miss', bonus: 0, reason: dx < 32 ? 'Sur l’arceau' : 'À côté du panier' });
        }
      }
    }
    render();
  }, !paused);

  const shootRef = useRef(shoot);
  shootRef.current = shoot;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') keys.current.left = true;
      else if (e.code === 'ArrowRight') keys.current.right = true;
      else if (isActionKey(e)) shootRef.current();
      else return;
      e.preventDefault();
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') keys.current.left = false;
      if (e.code === 'ArrowRight') keys.current.right = false;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  const setAimFromPointer = (e: React.PointerEvent) => {
    if (!svgRef.current || shot.current || !active) return;
    aim.current = clamp(svgPoint(svgRef.current, e).x, 40, 360);
  };

  // ---- derive the frame ----
  const now = t.current;
  const s = shot.current;
  const hx = s?.landHoopX ?? hoopX(now);
  const dX = defX(now);
  let ball = { x: BALL_X, y: BALL_Y, r: 14, rot: 0, o: 1 };
  if (s) {
    const f = (now - s.start) / FLIGHT_MS;
    if (s.blockedAt !== null) {
      const p = bezier(s.aimX, BLOCK_T);
      const k = (now - s.blockedAt) / 1000;
      ball = { x: p.x - 120 * k * Math.sign(s.aimX - 200 || 1), y: p.y + 40 * k + 600 * k * k, r: 13, rot: k * 720, o: 1 };
    } else if (f < 1) {
      const p = bezier(s.aimX, f);
      ball = { x: p.x, y: p.y, r: lerp(14, 8.5, f), rot: f * 540, o: 1 };
    } else {
      const k = (now - s.start - FLIGHT_MS) / 1000;
      if (s.result === 'in') {
        ball = { x: s.aimX + (hx - s.aimX) * Math.min(1, k * 8), y: RIM_Y + 260 * k * k + 30 * k, r: 8.5, rot: 540, o: Math.max(0, 1 - k * 1.6) };
      } else {
        const dir = Math.sign(s.aimX - hx) || 1;
        ball = { x: s.aimX + dir * 90 * k, y: RIM_Y - 40 * k + 520 * k * k, r: 8.5, rot: 540 + k * 400, o: Math.max(0, 1 - k) };
      }
    }
  }
  const showAim = !s && !timedOut;
  const swish = s?.result === 'in' && now - s.start - FLIGHT_MS < 400;

  return (
    <svg
      ref={svgRef}
      className="fsg-scene"
      viewBox="0 0 400 320"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Terrain de basket : un panier, un défenseur et ton ballon"
      onPointerMove={setAimFromPointer}
      onPointerDown={(e) => {
        pointerDown.current = true;
        setAimFromPointer(e);
      }}
      onPointerUp={() => {
        if (pointerDown.current) shoot();
        pointerDown.current = false;
      }}
    >
      {/* court */}
      <g className="fsg-court-lines">
        <path d="M-50 720 L140 190 L260 190 L450 720" />
        <path d="M120 320 Q200 150 280 320" />
        <path d="M-400 560 H800" />
        <ellipse cx="200" cy="190" rx="60" ry="14" />
        <line x1="-400" y1="190" x2="800" y2="190" />
      </g>

      {/* hoop */}
      <g transform={`translate(${hx - 200} 0)`}>
        <rect x="150" y="36" width="100" height="62" rx="3" className="fsg-board" />
        <rect x="182" y="66" width="36" height="26" className="fsg-board-inner" />
        <ellipse cx="200" cy={RIM_Y} rx="22" ry="5" className="fsg-rim-back" />
      </g>

      {/* aim preview */}
      {showAim && (
        <g className="fsg-aim" aria-hidden="true">
          <path d={`M${BALL_X} ${BALL_Y} Q${(BALL_X + aim.current) / 2} -40 ${aim.current} ${RIM_Y}`} />
          <circle cx={aim.current} cy={RIM_Y} r="9" />
          <line x1={aim.current - 14} y1={RIM_Y} x2={aim.current + 14} y2={RIM_Y} />
        </g>
      )}

      {/* defender */}
      <g transform={`translate(${dX} 0)`} className="fsg-player fsg-player--rival">
        <rect x="-12" y="212" width="9" height="36" rx="4" className="fsg-limb" />
        <rect x="3" y="212" width="9" height="36" rx="4" className="fsg-limb" />
        <rect x="-17" y="178" width="34" height="40" rx="10" className="fsg-jersey" />
        <circle cx="0" cy="166" r="10" className="fsg-head" />
        <rect x="-26" y="146" width="8" height="38" rx="4" transform="rotate(-12 -22 180)" className="fsg-limb" />
        <rect x="18" y="146" width="8" height="38" rx="4" transform="rotate(12 22 180)" className="fsg-limb" />
      </g>

      {/* ball */}
      <g transform={`translate(${ball.x} ${ball.y}) rotate(${ball.rot})`} opacity={ball.o}>
        <circle r={ball.r} className="fsg-ball-basket" />
        <path d={`M${-ball.r} 0 H${ball.r} M0 ${-ball.r} V${ball.r}`} className="fsg-ball-seam" />
        <path d={`M${-ball.r * 0.7} ${-ball.r * 0.7} Q0 0 ${-ball.r * 0.7} ${ball.r * 0.7} M${ball.r * 0.7} ${-ball.r * 0.7} Q0 0 ${ball.r * 0.7} ${ball.r * 0.7}`} className="fsg-ball-seam" />
      </g>

      {/* rim front + net, drawn over the ball */}
      <g transform={`translate(${hx - 200} 0)`}>
        <path d={`M178 ${RIM_Y} Q200 ${RIM_Y + 9} 222 ${RIM_Y}`} className="fsg-rim" />
        <path
          d={`M179 ${RIM_Y + 2} L186 ${RIM_Y + 30} L214 ${RIM_Y + 30} L221 ${RIM_Y + 2} M190 ${RIM_Y + 4} L193 ${RIM_Y + 30} M200 ${RIM_Y + 5} L200 ${RIM_Y + 30} M210 ${RIM_Y + 4} L207 ${RIM_Y + 30} M181 ${RIM_Y + 12} L219 ${RIM_Y + 12} M184 ${RIM_Y + 21} L216 ${RIM_Y + 21}`}
          className={'fsg-net' + (swish ? ' is-swish' : '')}
        />
      </g>
    </svg>
  );
}

export default memo(Basketball);
