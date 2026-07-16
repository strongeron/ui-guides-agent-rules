import { useEffect, useRef, useState } from 'react';

const MOUNT_PCT = 62;

export function FlexOverMeasurementBad() {
  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const [left, setLeft] = useState<number | null>(null);
  const [pct, setPct] = useState(MOUNT_PCT);

  // Measure-then-position. It runs once, positioning the label at the mount-time
  // value, and never re-runs when the value (or container) changes.
  useEffect(() => {
    const bar = barRef.current;
    const pill = pillRef.current;
    if (!bar || !pill) return;
    const barWidth = bar.getBoundingClientRect().width;
    const pillWidth = pill.getBoundingClientRect().width;
    setLeft(barWidth * (MOUNT_PCT / 100) - pillWidth / 2);
  }, []);

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
        <div ref={barRef} className="relative h-16">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
          </div>
          {/* The tick tracks the live value; the JS-placed label does not. */}
          <div className="absolute top-0 h-5 w-px bg-foreground/40" style={{ left: `${pct}%` }} />
          <span
            ref={pillRef}
            style={{ left: left ?? undefined }}
            className="absolute top-7 whitespace-nowrap rounded-md border border-border bg-muted px-2 py-1 text-xs text-foreground"
          >
            {pct}% used
          </span>
        </div>
      </div>

      <p className="text-xs text-error">
        getBoundingClientRect placed the label once, at mount ({MOUNT_PCT}%). Move the slider: the fill and
        tick follow, but the frozen label drifts off the mark it points at — the measurement never re-runs.
      </p>
    </div>
  );
}
