// localStorage can throw (private mode, blocked storage, sandboxed iframe):
// every access is guarded and the game works without it.
const PREFIX = 'fastsport-game:';

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function save<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* storage unavailable: keep the value in memory only */
  }
}
