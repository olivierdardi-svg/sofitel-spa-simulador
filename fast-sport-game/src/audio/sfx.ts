import { load, save } from '../lib/storage';

// Tiny synthesized sound effects (Web Audio): no audio files to load.
// The context is created on the first user gesture, as browsers require.

type Sfx = 'tap' | 'perfect' | 'good' | 'miss' | 'whistle' | 'tick' | 'combo' | 'end';

let ctx: AudioContext | null = null;
let enabled = load<boolean>('sound', true);
const listeners = new Set<(on: boolean) => void>();

function audio(): AudioContext | null {
  if (!enabled) return null;
  try {
    if (!ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', gain = 0.12, slideTo?: number) {
  const ac = audio();
  if (!ac) return;
  const t0 = ac.currentTime + start;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

export function play(name: Sfx): void {
  if (!enabled) return;
  switch (name) {
    case 'tap': tone(520, 0, 0.06, 'triangle', 0.08); break;
    case 'tick': tone(880, 0, 0.04, 'square', 0.03); break;
    case 'good': tone(660, 0, 0.09, 'triangle'); tone(990, 0.07, 0.12, 'triangle'); break;
    case 'perfect': tone(660, 0, 0.08, 'triangle'); tone(880, 0.06, 0.08, 'triangle'); tone(1320, 0.12, 0.18, 'triangle'); break;
    case 'combo': tone(1180, 0, 0.1, 'sine', 0.07, 1760); break;
    case 'miss': tone(220, 0, 0.22, 'sawtooth', 0.06, 110); break;
    case 'whistle': tone(2100, 0, 0.12, 'sine', 0.06); tone(2100, 0.16, 0.28, 'sine', 0.06); break;
    case 'end': tone(523, 0, 0.14, 'triangle'); tone(659, 0.12, 0.14, 'triangle'); tone(784, 0.24, 0.3, 'triangle'); break;
  }
}

export function isSoundOn(): boolean {
  return enabled;
}

export function setSound(on: boolean): void {
  enabled = on;
  save('sound', on);
  listeners.forEach((l) => l(on));
}

export function onSoundChange(l: (on: boolean) => void): () => void {
  listeners.add(l);
  return () => listeners.delete(l);
}
