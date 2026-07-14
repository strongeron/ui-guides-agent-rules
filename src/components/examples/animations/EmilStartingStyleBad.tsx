import { useState } from 'react';

/**
 * Bad: a transition is declared, but there is no style to interpolate *from* on
 * the very first rendered frame — so the toast simply pops into existence.
 * The usual workaround is a JS mounted-flag plus a double requestAnimationFrame,
 * which means an extra render and a class of "sometimes it doesn't animate" bugs.
 */
export function EmilStartingStyleBad() {
  const [shown, setShown] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4">
      <button
        onClick={() => setShown((v) => !v)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        {shown ? 'Hide toast' : 'Show toast'}
      </button>

      <div className="h-20 rounded-lg bg-muted p-3">
        {shown && (
          <div
            className="rounded-md border border-border bg-card p-3 text-sm text-card-foreground"
            style={{
              // Nothing to animate from: the element's first frame IS the end state.
              transition:
                'transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1)',
              transform: 'translateY(0)',
              opacity: 1,
            }}
          >
            Changes saved
          </div>
        )}
      </div>

      <p className="text-xs text-error">
        The toast pops in — a transition cannot interpolate from "not rendered yet"
      </p>
    </div>
  );
}
