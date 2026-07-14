export function ScrollEdgeEffectsBad() {
  return (
    <div className="space-y-3">
      <div className="relative h-56 overflow-hidden rounded-lg border border-border bg-card">
        {/* A 1px rule announcing a boundary that isn't one: content carries on underneath it. */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-border bg-card px-4 py-3">
          <span className="text-sm font-semibold text-foreground">Changelog</span>
          <span className="text-xs text-muted-foreground">v4.2</span>
        </div>

        <div className="h-full overflow-y-auto px-4 pb-4 pt-14">
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i} className="mb-3 text-sm leading-relaxed text-foreground">
              <span className="font-medium">4.2.{10 - i}</span> — Scroll this list. Every line is sliced
              clean in half by the divider the instant it reaches the header.
            </p>
          ))}
        </div>
      </div>

      <p className="text-xs text-destructive">
        A hard rule under a sticky header is a claim that content <em>ends</em> there. It does not — it
        continues underneath, and the border guillotines it. Scroll, and each line is chopped at exactly
        the same pixel: there is no depth here, only a cut. The header reads as a lid welded onto the
        content rather than as chrome floating above it.
      </p>
    </div>
  );
}
