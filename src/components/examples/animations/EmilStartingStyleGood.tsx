import { useState } from 'react';

/**
 * Good: `@starting-style` gives the browser the "before it existed" style, so a
 * plain CSS transition animates the entry. No mounted flag, no double rAF, no
 * extra render — and it degrades to an instant appearance where unsupported.
 */
export function EmilStartingStyleGood() {
  const [shown, setShown] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4">
      <style>{`
        .starting-style-toast {
          opacity: 1;
          transform: translateY(0);
          transition:
            transform 300ms cubic-bezier(0.23, 1, 0.32, 1),
            opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        @starting-style {
          .starting-style-toast {
            opacity: 0;
            transform: translateY(-16px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .starting-style-toast {
            transform: none;
            transition: opacity 150ms linear;
          }
        }
      `}</style>

      <button
        onClick={() => setShown((v) => !v)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {shown ? 'Hide toast' : 'Show toast'}
      </button>

      <div className="h-20 rounded-lg bg-muted p-3">
        {shown && (
          <div className="starting-style-toast rounded-md border border-border bg-card p-3 text-sm text-card-foreground">
            Changes saved
          </div>
        )}
      </div>

      <p className="text-xs text-success">
        @starting-style supplies the entry state — the toast slides and fades in with zero JS
      </p>
    </div>
  );
}
