const ROWS = [
  { label: 'Revenue', value: '$48,120' },
  { label: 'Active seats', value: '1,204' },
  { label: 'Churn', value: '1.8%' },
  { label: 'Expansion', value: '+6.2%' },
  { label: 'Trials', value: '87' },
  { label: 'Support load', value: '12 open' },
];

export function ImpeccableNoGlassmorphismGood() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Scroll inside the panel — the cards stay readable.</p>

      <div className="h-56 overflow-y-auto rounded-lg border border-border bg-background">
        <div className="sticky top-0 z-10 border-b border-border bg-background/85 px-3 py-2 backdrop-blur-sm">
          <p className="text-xs font-semibold text-foreground">Overview</p>
        </div>

        <div className="space-y-2 p-3">
          {ROWS.map((row) => (
            <div
              key={row.label}
              className="rounded-lg border border-border bg-card px-3 py-2"
            >
              <p className="text-xs font-semibold text-card-foreground">{row.label}</p>
              <p className="text-sm text-muted-foreground">{row.value}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-success">
        Cards sit on opaque surfaces from the elevation scale, so their contrast is a fixed, testable
        number. The blur is spent once, on the sticky header that genuinely overlaps scrolling content —
        the one place it earns its paint cost.
      </p>
    </div>
  );
}
