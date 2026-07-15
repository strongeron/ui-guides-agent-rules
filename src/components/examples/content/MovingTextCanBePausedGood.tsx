import { useState } from 'react';

export function MovingTextCanBePausedGood() {
  const [paused, setPaused] = useState(false);
  const items = '⚡ 40% off ends tonight · Free shipping over $50 · New arrivals just dropped · ';
  return (
    <div className="w-full max-w-sm py-6">
      <style>{`@keyframes uig-ticker-good{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @media (prefers-reduced-motion: reduce){.uig-ticker-good{animation:none !important}}`}</style>
      <div className="flex items-center gap-2 rounded-md border border-border bg-card py-2 pl-2">
        <button
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="shrink-0 rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {paused ? 'Play' : 'Pause'}
        </button>
        <div className="overflow-hidden">
          <div
            className="uig-ticker-good whitespace-nowrap text-sm text-foreground"
            style={{ animation: 'uig-ticker-good 8s linear infinite', animationPlayState: paused ? 'paused' : 'running' }}
          >
            {items}
            {items}
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-success">
        A pause control (WCAG 2.2.2) plus a reduced-motion stop: the motion is available, never forced.
      </p>
    </div>
  );
}
