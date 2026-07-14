const COPY =
  'Light glyphs on a dark field bloom: the bright strokes spill into the surrounding dark and read heavier and tighter than the identical type inverted. Nothing in the CSS changed, but the eye disagrees.';

export function ImpeccableDarkModeTextCompensationBad() {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        {/* Panel A: the page surface */}
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="mb-2 text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
            <span className="dark:hidden">Dark text on light</span>
            <span className="hidden dark:inline">Light text on dark</span>
          </p>
          <p className="text-sm font-normal leading-[1.5] tracking-normal text-card-foreground">
            {COPY}
          </p>
        </div>

        {/* Panel B: the inverted surface — whichever polarity Panel A is not */}
        <div className="rounded-lg border border-border bg-foreground p-3">
          <p className="mb-2 text-[0.6875rem] uppercase tracking-[0.08em] text-background/70">
            <span className="dark:hidden">Light text on dark</span>
            <span className="hidden dark:inline">Dark text on light</span>
          </p>
          <p className="text-sm font-normal leading-[1.5] tracking-normal text-background">
            {COPY}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-error">
          both panels: 1.5 / 0em / 400
        </span>
        <span className="text-muted-foreground">identical type styles, opposite polarity</span>
      </div>

      <p className="text-xs text-error">
        Same font, same size, same line-height, same tracking, same weight. Compare them: the
        light-on-dark panel looks cramped and noticeably bolder, because the bright strokes bleed
        outward against the dark ground. Shipping one type spec for both themes means one of them is
        always wrong.
      </p>
    </div>
  );
}
