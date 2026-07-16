import { useState } from 'react';

export function FlexOverMeasurementGood() {
  const [pct, setPct] = useState(62);

  return (
    <div className="w-full max-w-sm space-y-3">
      <label className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="shrink-0">Storage used</span>
        <input
          type="range"
          min={30}
          max={70}
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          aria-label="Storage used"
          className="flex-1 accent-primary"
        />
        <span className="w-9 text-right font-mono">{pct}%</span>
      </label>

      <div className="rounded-lg border border-border bg-card p-4">
        <p className="mb-3 text-sm font-medium text-foreground">Storage used</p>
        <div className="h-16">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
          </div>
          {/* The grid does the arithmetic: the column boundary IS the fill mark, and
              translate-x-1/2 centers the label on it for any value — no measuring. */}
          <div className="grid" style={{ gridTemplateColumns: `${pct}fr ${100 - pct}fr` }}>
            <div className="flex flex-col items-end">
              <div className="h-5 w-px bg-foreground/40" />
              <span className="mt-2 translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-muted px-2 py-1 text-xs text-foreground">
                {pct}% used
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-success">
        Pure grid + transform: the label rides the fill mark at every value — correct on first paint and it
        tracks the slider for free, with no measurement code.
      </p>
    </div>
  );
}
