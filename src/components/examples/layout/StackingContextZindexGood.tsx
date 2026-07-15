export function StackingContextZindexGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="relative h-44 rounded-lg border border-border bg-background">
        {/* Card A — no transform, so it creates no stacking context */}
        <div
          className="absolute rounded-lg border border-border bg-card p-2 text-xs text-foreground"
          style={{ left: 12, top: 16, width: 150, height: 100 }}
        >
          Card A (no transform)
          {/* z-9999 now resolves against the page, not against Card A */}
          <div
            className="absolute rounded bg-primary px-2 py-1 text-xs font-medium text-primary-foreground"
            style={{ left: 96, top: 52, zIndex: 9999 }}
          >
            badge z-9999
          </div>
        </div>
        {/* Card B — same position as the bad example */}
        <div
          className="absolute rounded-lg border border-border bg-muted p-2 text-xs text-foreground"
          style={{ left: 104, top: 40, width: 155, height: 96 }}
        >
          Card B
        </div>
      </div>
      <p className="mt-4 text-xs text-success">
        Same z-9999, same Card B — but with no accidental context the badge resolves against the page and sits on top.
      </p>
    </div>
  );
}
