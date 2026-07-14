import { useState } from 'react';

const PANELS = [
  { label: 'This week', value: '1,204 deploys' },
  { label: 'This month', value: '8,930 deploys' },
];

/**
 * Bad: a straight opacity crossfade. Mid-transition both layers are ~50%
 * opaque and perfectly legible, so the user sees two states double-exposed
 * instead of one state becoming another.
 */
export function EmilBlurCrossfadeBad() {
  const [index, setIndex] = useState(0);

  return (
    <div className="w-full max-w-sm space-y-4">
      <button
        onClick={() => setIndex((i) => (i === 0 ? 1 : 0))}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Swap range
      </button>

      <div className="relative h-24 rounded-lg border border-border bg-card">
        {PANELS.map((panel, i) => (
          <div
            key={panel.label}
            className="absolute inset-0 flex flex-col justify-center p-4"
            style={{
              transition: 'opacity 320ms ease-out',
              opacity: index === i ? 1 : 0,
            }}
          >
            <span className="text-xs text-muted-foreground">{panel.label}</span>
            <span className="text-xl font-semibold text-card-foreground">{panel.value}</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-error">
        Both numbers stay readable at the halfway point — you see a ghosted double image, not a change
      </p>
    </div>
  );
}
