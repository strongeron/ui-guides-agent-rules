import { useState } from 'react';

/**
 * Bad: a dropdown that takes 650ms to open. It is over the 300ms UI ceiling by
 * more than 2x, and over the 150–250ms dropdown budget by nearly 3x.
 */
export function EmilDurationBudgetBad() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        {open ? 'Close menu' : 'Open menu'}
      </button>

      <div className="h-32">
        <div
          className="origin-top rounded-lg border border-border bg-card p-2 shadow-sm"
          style={{
            transition:
              'transform 650ms cubic-bezier(0.23, 1, 0.32, 1), opacity 650ms cubic-bezier(0.23, 1, 0.32, 1)',
            transform: open ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(-6px)',
            opacity: open ? 1 : 0,
            pointerEvents: open ? 'auto' : 'none',
          }}
        >
          {['Rename', 'Duplicate', 'Delete'].map((item) => (
            <div key={item} className="rounded px-2 py-1.5 text-sm text-card-foreground hover:bg-muted">
              {item}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-error">
        650ms dropdown — you finish reading the menu before it finishes arriving
      </p>
    </div>
  );
}
