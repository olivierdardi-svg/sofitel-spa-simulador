import { useCallback, useEffect, useState } from 'react';
import { isSoundOn, setSound } from './audio/sfx';
import type { ScoreState } from './game/scoring';
import { load, save } from './lib/storage';
import { Game } from './screens/Game';
import { Home } from './screens/Home';
import { Results } from './screens/Results';

type Screen = 'home' | 'game' | 'results';

export function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [gameKey, setGameKey] = useState(0);
  const [best, setBest] = useState(() => load<number>('best', 0));
  const [result, setResult] = useState<{ score: ScoreState; record: boolean } | null>(null);

  const start = useCallback(() => {
    setGameKey((k) => k + 1);
    setScreen('game');
  }, []);

  const finish = useCallback((score: ScoreState) => {
    const prev = load<number>('best', 0);
    const record = score.score > prev;
    if (record) {
      save('best', score.score);
      setBest(score.score);
    }
    setResult({ score, record });
    setScreen('results');
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === 'KeyM' && !e.repeat) setSound(!isSoundOn());
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="fsg-app" data-screen={screen}>
      {screen === 'home' && <Home best={best} onPlay={start} />}
      {screen === 'game' && (
        <Game key={gameKey} onFinish={finish} onRestart={start} onQuit={() => setScreen('home')} />
      )}
      {screen === 'results' && result && (
        <Results result={result.score} best={best} isRecord={result.record} onReplay={start} />
      )}
    </div>
  );
}
