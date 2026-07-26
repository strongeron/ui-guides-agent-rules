import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Agentation } from 'agentation';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;

const tree = (
  <StrictMode>
    <App />
    {import.meta.env.DEV && <Agentation />}
  </StrictMode>
);

// Rule pages ship prerendered markup (scripts/prerender.ts), so React attaches to what
// is already there instead of throwing it away and re-rendering — no flash, and no
// second paint. In dev, and on any route that was not prerendered, the container is
// empty and this falls back to a normal mount.
if (container.firstElementChild) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
