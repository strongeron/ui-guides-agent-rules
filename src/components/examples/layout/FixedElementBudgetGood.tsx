export function FixedElementBudgetGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="relative h-40 overflow-hidden rounded-lg border border-border bg-card">
        <div className="absolute inset-x-0 top-0 z-10 bg-primary px-3 py-2 text-xs font-medium text-primary-foreground">
          Fixed nav
        </div>
        {/* Content offset by the bar's height — first line clears it */}
        <div className="space-y-2 px-3 pb-3 pt-12 text-sm text-foreground">
          <p>First item — fully visible</p>
          <p>Second item</p>
          <p>Third item</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-success">
        Content offset by the nav’s height (and scroll-padding-top for anchors/focus) — nothing hides behind it.
      </p>
    </div>
  );
}
