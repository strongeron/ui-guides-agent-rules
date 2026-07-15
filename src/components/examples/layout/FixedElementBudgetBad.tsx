export function FixedElementBudgetBad() {
  return (
    <div className="w-full max-w-sm">
      {/* Scroll container standing in for the viewport */}
      <div className="relative h-40 overflow-hidden rounded-lg border border-border bg-card">
        {/* "Fixed" bar, taken out of flow */}
        <div className="absolute inset-x-0 top-0 z-10 bg-primary px-3 py-2 text-xs font-medium text-primary-foreground">
          Fixed nav
        </div>
        {/* Content with no offset — first lines sit under the bar */}
        <div className="space-y-2 p-3 text-sm text-foreground">
          <p>First item — hidden under the nav</p>
          <p>Second item</p>
          <p>Third item</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-destructive">
        The fixed bar is out of flow, so the first content line renders underneath it — no space was reserved.
      </p>
    </div>
  );
}
