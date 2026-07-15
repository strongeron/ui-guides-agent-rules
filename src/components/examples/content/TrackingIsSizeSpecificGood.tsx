import { useState } from 'react';

/**
 * Interactive proof of "size-specific": one slider sets a single letter-spacing for BOTH
 * a 40px headline and an 11px caption. There is no value that flatters both at once —
 * tighten and the caption cramps, loosen and the headline drifts. The toggle applies
 * per-size values (display −0.02em, caption +0.05em) and both finally land.
 */
export function TrackingIsSizeSpecificGood() {
  const [ls, setLs] = useState(0.04);
  const [sizeSpecific, setSizeSpecific] = useState(false);

  const displayLs = sizeSpecific ? -0.02 : ls;
  const captionLs = sizeSpecific ? 0.05 : ls;
  const headlineLoose = !sizeSpecific && ls > -0.005;
  const captionCramped = !sizeSpecific && ls < 0.03;

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-border bg-card p-5">
        <p className="text-foreground" style={{ fontSize: '40px', lineHeight: 1.05, fontWeight: 700, letterSpacing: `${displayLs}em` }}>
          Ship faster
        </p>
        <p className="mt-3 text-muted-foreground uppercase" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: `${captionLs}em` }}>
          Updated 3 minutes ago
        </p>

        <div className="mt-5 space-y-2 border-t border-border pt-4">
          <label className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <span className="shrink-0">One value, all sizes</span>
            <input
              type="range"
              min={-0.04}
              max={0.08}
              step={0.005}
              value={ls}
              disabled={sizeSpecific}
              onChange={(e) => setLs(parseFloat(e.target.value))}
              className="w-full disabled:opacity-40"
            />
          </label>
          <p className="font-mono text-xs text-foreground">
            {sizeSpecific ? 'display −0.02em · caption +0.05em' : `${ls >= 0 ? '+' : ''}${ls.toFixed(3)}em everywhere`}
          </p>
          <p className="min-h-4 text-xs text-destructive">
            {!sizeSpecific && headlineLoose && 'Headline drifts loose'}
            {!sizeSpecific && headlineLoose && captionCramped && ' · '}
            {!sizeSpecific && captionCramped && 'Caption too cramped'}
          </p>
          <label className="flex items-center gap-2 text-xs text-foreground">
            <input
              type="checkbox"
              checked={sizeSpecific}
              onChange={(e) => setSizeSpecific(e.target.checked)}
              className="size-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            />
            Use size-specific tracking
          </label>
        </div>
      </div>
      <p className="mt-4 text-xs text-success">
        Drag the slider — no single value flatters both sizes. Size-specific tracking (ideally via a variable font’s
        optical-sizing axis) is the only fix.
      </p>
    </div>
  );
}
