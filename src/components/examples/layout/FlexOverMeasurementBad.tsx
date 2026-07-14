import { useEffect, useRef, useState } from 'react';

export function FlexOverMeasurementBad() {
  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const [left, setLeft] = useState(0);
  const [label, setLabel] = useState('...');

  // Real content almost never arrives on the first paint.
  useEffect(() => {
    const timer = setTimeout(() => setLabel('310 GB of 500 GB'), 400);
    return () => clearTimeout(timer);
  }, []);

  // Measure-then-position. It cannot run before paint, so the marker starts at 0
  // and jumps into place. It measured the placeholder label, and it never re-runs
  // when the label or the container changes size.
  useEffect(() => {
    const bar = barRef.current;
    const pill = pillRef.current;
    if (!bar || !pill) return;
    const barWidth = bar.getBoundingClientRect().width;
    const pillWidth = pill.getBoundingClientRect().width;
    setLeft(barWidth * 0.62 - pillWidth / 2);
  }, []);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-sm font-medium text-foreground mb-3">Storage used</p>
        <div ref={barRef} className="relative h-16">
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full w-[62%] rounded-full bg-primary" />
          </div>
          {/* The 62% mark the label is supposed to point at. */}
          <div className="absolute left-[62%] top-0 h-5 w-px bg-foreground/40" />
          <span
            ref={pillRef}
            style={{ left }}
            className="absolute top-7 whitespace-nowrap rounded-md border border-border bg-muted px-2 py-1 text-xs text-foreground"
          >
            {label}
          </span>
        </div>
      </div>
      <p className="text-xs text-error mt-4">
        getBoundingClientRect in useEffect: the label is positioned from a stale mount-time
        measurement, so it drifts off the 62% tick and lags behind resize.
      </p>
    </div>
  );
}
