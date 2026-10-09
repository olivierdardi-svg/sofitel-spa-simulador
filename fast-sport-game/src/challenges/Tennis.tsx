import { memo, useEffect, useReducer, useRef } from 'react';
import { play } from '../audio/sfx';
import { useFrame } from '../lib/useFrame';
import { isActionKey, lerp } from './svg';
import type { SportChallengeProps } from './types';

const GROUND = 262;
const SERVE_X = 336;
const HIT_X = 92;
const HIT_Y = 212;
const BOUNCE_X = 160;
const BALLS = 3;
const FIRST_SERVE_DELAY = 450;
const RETURN_MS = 380;
const NEXT_SERVE_DELAY = 220;

type BallPhase = 'wait' | 'incoming' | 'return' | 'done';

interface Rally {
  phase: BallPhase;
  since: number;
  ball: number; // 0-based index of the current ball
  hits: number;
  perfects: number;
  speed: number; // px per ms
  lastJudge: { text: string; at: number; good: boolean } | null;
  swingAt: number;
  returnFrom: { x: number; y: number };
}

/** Ball position for a given x on the way in (side view with one bounce). */
function incomingY(x: number): number {
  const sb = (SERVE_X - BOUNCE_X) / (SERVE_X - HIT_X);
  const s = (SERVE_X - x) / (SERVE_X - HIT_X);
  if (s < sb) {
    const k = s / sb;
    return lerp(160, GROUND, k * k) - 26 * Math.sin(Math.PI * k);
  }
  const k = (s - sb) / (1 - sb);
  return GROUND - (GROUND - HIT_Y) * k - 26 * Math.sin(Math.PI * Math.min(k, 1)) * (k < 1 ? 1 : 0);
}

function Tennis({ difficulty, active, paused, onCommit, onResult }: SportChallengeProps) {
  const [, render] = useReducer((n: number) => n + 1, 0);
  const t = useRef(0);
  const committed = useRef(false);
  const baseSpeed = 0.235 + 0.13 * difficulty;
  const perfectMs = lerp(62, 42, difficulty);
  const goodMs = lerp(135, 100, difficulty);
  const rally = useRef<Rally>({
    phase: 'wait',
    since: 0,
    ball: 0,
    hits: 0,
    perfects: 0,
    speed: baseSpeed,
    lastJudge: null,
    swingAt: -1000,
    returnFrom: { x: HIT_X, y: HIT_Y },
  });

  const finish = (reason?: string) => {
    const r = rally.current;
    r.phase = 'done';
    if (!committed.current) {
      committed.current = true;
      onCommit();
    }
    const summary = `${r.hits}/${BALLS} retours` + (r.perfects ? ` · ${r.perfects} parfait${r.perfects > 1 ? 's' : ''}` : '');
    const bonus = r.perfects * 15;
    if (r.hits === BALLS) onResult({ tier: r.perfects >= 2 ? 'perfect' : 'good', bonus, reason: summary });
    else if (r.hits === 2) onResult({ tier: 'ok', bonus, reason: `${reason} · ${summary}` });
    else if (r.hits === 1) onResult({ tier: 'almost', bonus: 0, reason: `${reason} · ${summary}` });
    else onResult({ tier: 'miss', bonus: 0, reason: reason ?? 'Balle manquée' });
  };

  const now = () => t.current;
  const ballX = (time: number) => SERVE_X - (time - rally.current.since) * rally.current.speed;

  const swing = () => {
    const r = rally.current;
    if (!active || r.phase === 'done') return;
    if (now() - r.swingAt < 160) return;
    r.swingAt = now();
    if (r.phase !== 'incoming') return;
    const err = (ballX(now()) - HIT_X) / r.speed; // ms, positive = early
    if (err > goodMs) {
      r.lastJudge = { text: 'TROP TÔT', at: now(), good: false };
      finish('Trop tôt');
      return;
    }
    if (!committed.current) {
      committed.current = true;
      onCommit();
    }
    const perfect = Math.abs(err) <= perfectMs;
    r.hits += 1;
    if (perfect) r.perfects += 1;
    r.lastJudge = { text: perfect ? 'PERFECT' : 'GOOD', at: now(), good: true };
    play(perfect ? 'perfect' : 'tap');
    r.returnFrom = { x: ballX(now()), y: incomingY(ballX(now())) };
    r.phase = 'return';
    r.since = now();
    if (r.hits === BALLS) finish();
  };

  useFrame((_dt, time) => {
    t.current = time;
    const r = rally.current;
    if (r.phase === 'wait' && active && time - r.since > (r.ball === 0 ? FIRST_SERVE_DELAY : NEXT_SERVE_DELAY)) {
      r.phase = 'incoming';
      r.since = time;
    } else if (r.phase === 'incoming') {
      const err = (ballX(time) - HIT_X) / r.speed;
      if (err < -goodMs) {
        r.lastJudge = { text: 'TROP TARD', at: time, good: false };
        finish('Trop tard');
      }
    } else if (r.phase === 'return' && time - r.since > RETURN_MS && r.hits < BALLS) {
      r.ball += 1;
      r.speed = baseSpeed * (1 + 0.16 * r.ball);
      r.phase = 'wait';
      r.since = time;
    }
    render();
  }, !paused);

  const swingRef = useRef(swing);
  swingRef.current = swing;
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!isActionKey(e)) return;
      e.preventDefault();
      swingRef.current();
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);

  // ---- frame ----
  const r = rally.current;
  const time = t.current;
  let ball = { x: SERVE_X, y: 160, visible: r.phase === 'wait' };
  const returning = r.phase === 'return' || (r.phase === 'done' && r.hits === BALLS);
  if (returning) {
    const k = Math.min(1, (time - r.since) / RETURN_MS);
    ball = {
      x: lerp(r.returnFrom.x, SERVE_X + 20, k),
      y: lerp(r.returnFrom.y, 150, k) - 70 * Math.sin(Math.PI * k),
      visible: k < 1,
    };
  } else if (r.phase === 'incoming' || r.phase === 'done') {
    // a missed ball simply keeps its course past the player
    const x = ballX(time);
    ball = { x, y: incomingY(x), visible: x > -20 && incomingY(x) > -20 };
  }
  const swingK = Math.min(1, (time - r.swingAt) / 200);
  const racketAngle = swingK < 1 ? lerp(-70, 50, swingK) : -10;
  const judge = r.lastJudge && time - r.lastJudge.at < 600 ? r.lastJudge : null;

  // timing track: projection of the ball on a horizontal rail
  const trackLeft = 40;
  const trackRight = 360;
  const railFrom = HIT_X - 60;
  const toTrack = (x: number) => lerp(trackLeft, trackRight, (x - railFrom) / (SERVE_X - railFrom));
  const zone = (ms: number) => {
    const a = toTrack(HIT_X - ms * r.speed);
    const b = toTrack(HIT_X + ms * r.speed);
    return { x: Math.max(trackLeft, a), w: Math.max(0, b - Math.max(trackLeft, a)) };
  };
  const goodZone = zone(goodMs);
  const perfectZone = zone(perfectMs);
  const marker = r.phase === 'incoming' ? toTrack(ballX(time)) : null;

  return (
    <svg
      className="fsg-scene"
      viewBox="0 0 400 320"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Court de tennis : renvoie la balle au bon moment"
      onPointerDown={swing}
    >
      <g className="fsg-court-lines">
        <line x1="-400" y1={GROUND} x2="800" y2={GROUND} />
        <line x1="-400" y1={GROUND + 18} x2="800" y2={GROUND + 18} />
      </g>
      <rect x="198" y={GROUND - 42} width="4" height="42" className="fsg-net-post" />
      <path d={`M200 ${GROUND - 40} V${GROUND}`} className="fsg-net-mesh" />

      {/* hit zone */}
      <circle cx={HIT_X} cy={HIT_Y} r="22" className={'fsg-hitzone' + (r.phase === 'incoming' ? ' is-armed' : '')} />

      {/* opponent */}
      <g transform="translate(352 0)" className="fsg-player fsg-player--rival">
        <rect x="-10" y="220" width="8" height="42" rx="4" className="fsg-limb" />
        <rect x="2" y="220" width="8" height="42" rx="4" className="fsg-limb" />
        <rect x="-14" y="184" width="28" height="40" rx="9" className="fsg-jersey" />
        <circle cx="0" cy="172" r="9" className="fsg-head" />
        <g transform={`rotate(${r.phase === 'wait' ? 0 : 30} -12 194)`}>
          <rect x="-36" y="190" width="24" height="5" rx="2.5" className="fsg-limb" />
          <ellipse cx="-44" cy="176" rx="9" ry="13" className="fsg-racket" />
        </g>
      </g>

      {/* player */}
      <g transform="translate(56 0)" className="fsg-player">
        <rect x="-10" y="220" width="8" height="42" rx="4" className="fsg-limb" />
        <rect x="2" y="220" width="8" height="42" rx="4" className="fsg-limb" />
        <rect x="-14" y="184" width="28" height="40" rx="9" className="fsg-jersey" />
        <circle cx="0" cy="172" r="9" className="fsg-head" />
        <g transform={`rotate(${racketAngle} 10 198)`}>
          <rect x="10" y="195" width="24" height="5" rx="2.5" className="fsg-limb" />
          <ellipse cx="42" cy="196" rx="10" ry="14" className="fsg-racket" />
        </g>
      </g>

      {/* ball + shadow */}
      {ball.visible && (
        <>
          <ellipse cx={ball.x} cy={GROUND + 2} rx={6} ry={2} className="fsg-shadow" opacity={Math.max(0.15, 1 - (GROUND - ball.y) / 140)} />
          <circle cx={ball.x} cy={ball.y} r="7" className="fsg-ball-tennis" />
        </>
      )}

      {judge && (
        <text x={HIT_X} y={HIT_Y - 38} className={'fsg-scene-judge' + (judge.good ? '' : ' is-bad')} textAnchor="middle">
          {judge.text}
        </text>
      )}

      {/* rally dots */}
      <g transform="translate(200 40)">
        {Array.from({ length: BALLS }, (_, i) => (
          <circle
            key={i}
            cx={(i - 1) * 18}
            cy="0"
            r="5"
            className={'fsg-dot' + (i < r.hits ? ' is-on' : '') + (i === r.ball && r.phase !== 'done' ? ' is-current' : '')}
          />
        ))}
      </g>

      {/* timing track */}
      <g className="fsg-track" transform="translate(0 300)">
        <rect x={trackLeft} y="-3" width={trackRight - trackLeft} height="6" rx="3" className="fsg-track-rail" />
        <rect x={goodZone.x} y="-5" width={goodZone.w} height="10" rx="3" className="fsg-track-good" />
        <rect x={perfectZone.x} y="-5" width={perfectZone.w} height="10" rx="3" className="fsg-track-perfect" />
        {marker !== null && marker >= trackLeft - 4 && <circle cx={marker} cy="0" r="7" className="fsg-track-marker" />}
      </g>
    </svg>
  );
}

export default memo(Tennis);
