import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/archivo/wdth.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/screens.css';
import './styles/game.css';
import './styles/challenges.css';
import { App } from './App';

createRoot(document.getElementById('fsg-root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
