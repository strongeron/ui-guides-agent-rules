export function StackingContextZindexBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="relative h-44 rounded-lg border border-border bg-background">
        {/* Card A — earlier in DOM. `transform` makes it a stacking context. */}
        <div
          className="absolute rounded-lg border border-border bg-card p-2 text-xs text-foreground"
          style={{ left: 12, top: 16, width: 150, height: 100, transform: 'translateZ(0)' }}
        >
          Card A (has transform)
          {/* z-9999, but trapped inside Card A's context */}
          <div
            className="absolute rounded bg-primary px-2 py-1 text-xs font-medium text-primary-foreground"
            style={{ left: 96, top: 52, zIndex: 9999 }}
          >
            badge z-9999
          </div>
        </div>
        {/* Card B — later in DOM, overlaps Card A and the badge's position */}
        <div
          className="absolute rounded-lg border border-border bg-muted p-2 text-xs text-foreground"
          style={{ left: 104, top: 40, width: 155, height: 96 }}
        >
          Card B
        </div>
      </div>
      <p className="mt-4 text-xs text-destructive">
        The badge is gone: z-index:9999 is trapped in Card A’s transform context, so later-painted Card B covers it.
      </p>
    </div>
  );
}
