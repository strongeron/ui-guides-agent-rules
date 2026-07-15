export function StackingContextZindexGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="relative h-40 rounded-lg border border-border bg-background p-2">
        {/* Card A — no transform, so it creates no stacking context */}
        <div className="absolute left-3 top-6 h-24 w-40 rounded-lg border border-border bg-card p-2 text-xs">
          Card A (no transform)
          <div
            className="absolute -right-3 -top-3 rounded bg-primary px-2 py-1 text-xs text-primary-foreground"
            style={{ zIndex: 9999 }}
          >
            badge z-9999
          </div>
        </div>
        {/* Card B — later in DOM, overlaps A */}
        <div className="absolute left-28 top-14 h-24 w-40 rounded-lg border border-border bg-muted p-2 text-xs">
          Card B
        </div>
      </div>
      <p className="mt-4 text-xs text-success">
        Remove the accidental context and z-index resolves against the page — the badge wins, no bigger number needed.
      </p>
    </div>
  );
}
