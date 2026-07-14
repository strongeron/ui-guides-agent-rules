import { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const PANELS = [
  { label: 'This week', value: '1,204 deploys' },
  { label: 'This month', value: '8,930 deploys' },
];

/**
 * Good: the outgoing layer picks up a 2px blur (and a hair of scale) while it
 * fades. The two states stop being separately legible at the midpoint, so the
 * eye reads one transformation instead of two overlapping panels.
 *
 * Keep the blur small (well under 20px) and scoped to the transition — a large
 * or long-lived blur is genuinely expensive to rasterize, especially in Safari.
 */
export function EmilBlurCrossfadeGood() {
  const [index, setIndex] = useState(0);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <div className="w-full max-w-sm space-y-4">
      <button
        onClick={() => setIndex((i) => (i === 0 ? 1 : 0))}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        Swap range
      </button>

      <div className="relative h-24 rounded-lg border border-border bg-card">
        {PANELS.map((panel, i) => {
          const active = index === i;
          return (
            <div
              key={panel.label}
              className="absolute inset-0 flex flex-col justify-center p-4"
              style={{
                transition: reduced
                  ? 'opacity 150ms linear'
                  : 'opacity 320ms ease-out, filter 320ms ease-out, transform 320ms ease-out',
                opacity: active ? 1 : 0,
                filter: reduced || active ? 'blur(0px)' : 'blur(2px)',
                transform: reduced || active ? 'scale(1)' : 'scale(0.98)',
              }}
            >
              <span className="text-xs text-muted-foreground">{panel.label}</span>
              <span className="text-xl font-semibold text-card-foreground">{panel.value}</span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-success">
        A 2px blur on the outgoing layer masks the overlap — the two states merge into one perceived change
      </p>
    </div>
  );
}
