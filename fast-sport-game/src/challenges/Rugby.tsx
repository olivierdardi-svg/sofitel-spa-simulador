import { memo, useEffect, useReducer, useRef, useState } from 'react';
import { play } from '../audio/sfx';
import { useFrame } from '../lib/useFrame';
import { isActionKey, lerp } from './svg';
import type { SportChallengeProps } from './types';

const TEE_X = 200;
const TEE_Y = 284;
const BAR_Y = 118;
const HORIZON = 152;
const SPREAD = 100; // lateral reach of a full-deflection aim at the posts
const FLIGHT_MS = 900;

type Step = 'aim' | 'power' | 'flight' | 'done';

function Rugby({ difficulty, active, paused, onCommit, onResult }: SportChallengeProps) {
  const [, render] = useReducer((n: number) => n + 1, 0);
  const t = useRef(0);
  const step = useRef<Step>('aim');
  const dir = useRef(0);
  const power = useRef(0);
  const flightStart = useRef(0);
  const resolved = useRef(false);
  const phaseOffset = useRef(0);

  const halfW = lerp(36, 21, difficulty);
  const required = lerp(0.5, 0.7, difficulty);
  // Wind appears after the first third of the game; its side is random.
  const [wind] = useState(() => (difficulty >= 0.3 ? (Math.random() < 0.5 ? -1 : 1) * Math.round(lerp(12, 32, difficulty)) : 0));
  const aimSpeed = lerp(0.0026, 0.0036, difficulty);
  const powerPeriod = lerp(1150, 760, difficulty);

  const needleAt = (time: number) => Math.sin(time * aimSpeed);
  const powerAt = (time: number) => {
    const p = ((time - phaseOffset.current) % powerPeriod) / powerPeriod;
    return p < 0.5 ? p * 2 : 2 - p * 2;
  };

  const lock = () => {
    if (!active) return;
    const now = t.current;
    if (step.current === 'aim') {
      dir.current = needleAt(now);
      step.current = 'power';
      phaseOffset.current = now;
      play('tap');
    } else if (step.current === 'power') {
      power.current = powerAt(now);
      step.current = 'flight';
      flightStart.current = now;
      onCommit();
      play('tap');
    }
  };

  const finalX = () => TEE_X + dir.current * SPREAD + wind;

  useFrame((_dt, now) => {
    t.current = now;
    if (step.current === 'flight' && !resolved.current && now - flightStart.current >= FLIGHT_MS) {
      resolved.current = true;
      step.current = 'done';
      const dx = Math.abs(finalX() - TEE_X);
      if (power.current < required) onResult({ tier: 'miss', bonus: 0, reason: 'Trop court' });
      else if (dx <= halfW - 3) {
        const bonus = Math.round((1 - dx / halfW) * 50);
        onResult(
          dx <= halfW * 0.35
            ? { tier: 'perfect', bonus, reason: 'Pile entre les perches' }
            : { tier: 'good', bonus, reason: 'Transformé, précision +' + bonus },
        );
      } else onResult({ tier: 'miss', bonus: 0, reason: Math.abs(dx - halfW) < 5 ? 'Sur le poteau' : 'À côté des poteaux' });
    }
    render();
  }, !paused);

  const lockRef = useRef(lock);
  lockRef.current = lock;
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!isActionKey(e)) return;
      e.preventDefault();
      lockRef.current();
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);

  // ---- frame ----
  const now = t.current;
  const s = step.current;
  const needle = s === 'aim' ? needleAt(now) : dir.current;
  const gauge = s === 'power' ? powerAt(now) : s === 'aim' ? 0 : power.current;
  const aimMarkX = TEE_X + needle * SPREAD;

  let ball = { x: TEE_X, y: TEE_Y - 10, sc: 1, rot: 0, o: 1 };
  if (s === 'flight' || s === 'done') {
    const f = Math.min(1, (now - flightStart.current) / FLIGHT_MS);
    const short = power.current < required;
    const endY = short ? HORIZON + 6 : 64;
    const fx = finalX();
    const lift = short ? 110 * power.current + 40 : 120;
    let x = lerp(TEE_X, fx, f);
    let y = lerp(TEE_Y - 10, endY, f) - lift * Math.sin(Math.PI * f) * (short ? 1 : 0.6);
    const after = Math.max(0, now - flightStart.current - FLIGHT_MS) / 1000;
    if (after > 0 && !short) y -= after * 30;
    if (after > 0) x += (fx - TEE_X) * after * 0.1;
    ball = { x, y, sc: lerp(1, 0.32, f), rot: f * 900, o: after > 0.5 ? Math.max(0, 1 - (after - 0.5) * 3) : 1 };
  }

  const needleAngle = needle * 50;
  const scored = s === 'done' && power.current >= required && Math.abs(finalX() - TEE_X) <= halfW - 3;

  return (
    <svg
      className="fsg-scene"
      viewBox="0 0 400 320"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Terrain de rugby : choisis la direction puis la puissance de la pénalité"
      onPointerDown={lock}
    >
      {/* pitch in perspective */}
      <g className="fsg-court-lines">
        <line x1="-400" y1={HORIZON} x2="800" y2={HORIZON} />
        <path d={`M120 ${HORIZON} L-200 720 M280 ${HORIZON} L600 720 M160 ${HORIZON} L20 720 M240 ${HORIZON} L380 720`} />
        <line x1="-400" y1="226" x2="800" y2="226" />
        <line x1="-400" y1="420" x2="800" y2="420" />
      </g>

      {/* posts */}
      <g className={'fsg-posts' + (scored ? ' is-scored' : '')}>
        <line x1={TEE_X - halfW} y1="22" x2={TEE_X - halfW} y2={HORIZON} />
        <line x1={TEE_X + halfW} y1="22" x2={TEE_X + halfW} y2={HORIZON} />
        <line x1={TEE_X - halfW} y1={BAR_Y} x2={TEE_X + halfW} y2={BAR_Y} />
      </g>

      {/* aim marker on the crossbar line (without wind) */}
      {(s === 'aim' || s === 'power') && (
        <g className="fsg-aim" aria-hidden="true">
          <line x1={aimMarkX} y1={BAR_Y - 30} x2={aimMarkX} y2={BAR_Y + 12} />
          <circle cx={aimMarkX} cy={BAR_Y - 30} r="4" />
        </g>
      )}

      {/* wind */}
      {wind !== 0 && (
        <g className="fsg-wind" transform="translate(28 34)">
          <text x="0" y="0">VENT</text>
          <path d={wind > 0 ? 'M0 12 H40 M32 6 L40 12 L32 18' : 'M40 12 H0 M8 6 L0 12 L8 18'} />
          <text x="0" y="36">{Math.abs(wind) > 22 ? 'FORT' : 'LÉGER'}</text>
        </g>
      )}

      {/* direction gauge */}
      <g transform={`translate(${TEE_X} ${TEE_Y + 4})`} className={'fsg-dial' + (s === 'aim' ? ' is-active' : '')}>
        <path d="M-62 -36 A72 72 0 0 1 62 -36" className="fsg-dial-arc" />
        <line x1="0" y1="0" x2="0" y2="-74" transform={`rotate(${needleAngle})`} className="fsg-dial-needle" />
      </g>

      {/* tee + ball */}
      <path d={`M${TEE_X - 10} ${TEE_Y + 6} L${TEE_X} ${TEE_Y - 2} L${TEE_X + 10} ${TEE_Y + 6} Z`} className="fsg-tee" />
      <g transform={`translate(${ball.x} ${ball.y}) scale(${ball.sc}) rotate(${ball.rot})`} opacity={ball.o}>
        <ellipse rx="10" ry="15" className="fsg-ball-rugby" />
        <path d="M0 -10 V10 M-3 -4 H3 M-3 0 H3 M-3 4 H3" className="fsg-ball-seam" />
      </g>

      {/* power gauge */}
      <g transform="translate(362 170)" className={'fsg-power' + (s === 'power' ? ' is-active' : '')}>
        <rect x="-8" y="0" width="16" height="120" rx="8" className="fsg-power-rail" />
        <rect x="-8" y={120 - 120 * gauge} width="16" height={120 * gauge} rx="8" className={'fsg-power-fill' + (gauge >= required ? ' is-ok' : '')} />
        <line x1="-14" y1={120 - 120 * required} x2="14" y2={120 - 120 * required} className="fsg-power-min" />
        <text x="0" y="-10" textAnchor="middle">PUISSANCE</text>
      </g>

      {/* step label */}
      <text x={TEE_X} y="208" textAnchor="middle" className="fsg-step">
        {s === 'aim' ? '1 · DIRECTION' : s === 'power' ? '2 · PUISSANCE' : ''}
      </text>
    </svg>
  );
}

export default memo(Rugby);
