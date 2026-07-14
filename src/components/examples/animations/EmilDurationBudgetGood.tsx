import { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const BUDGETS = [
  ['Button press', '100–160ms'],
  ['Tooltip', '125–200ms'],
  ['Dropdown', '150–250ms'],
  ['Modal / drawer', '200–500ms'],
];

/**
 * Good: 180ms — inside the 150–250ms dropdown budget and under the 300ms
 * UI ceiling. It lands before you have finished moving your eyes to it.
 */
export function EmilDurationBudgetGood() {
  const [open, setOpen] = useState(false);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  const duration = reduced ? 0 : 180;

  return (
    <div className="w-full max-w-sm space-y-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {open ? 'Close menu' : 'Open menu'}
      </button>

      <div className="h-32">
        <div
          className="origin-top rounded-lg border border-border bg-card p-2 shadow-sm"
          style={{
            transition: `transform ${duration}ms cubic-bezier(0.23, 1, 0.32, 1), opacity ${duration}ms cubic-bezier(0.23, 1, 0.32, 1)`,
            transform: reduced
              ? 'none'
              : open
                ? 'scale(1) translateY(0)'
                : 'scale(0.96) translateY(-6px)',
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

      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {BUDGETS.map(([label, budget]) => (
          <div key={label} className="contents">
            <dt>{label}</dt>
            <dd className="text-foreground">{budget}</dd>
          </div>
        ))}
      </dl>

      <p className="text-xs text-success">
        180ms — inside the dropdown budget and under the 300ms UI ceiling
      </p>
    </div>
  );
}
