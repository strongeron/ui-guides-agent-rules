export function FontSmoothingBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3" style={{ WebkitFontSmoothing: 'auto', MozOsxFontSmoothing: 'auto' } as React.CSSProperties}>
        <h3 className="text-lg font-semibold text-foreground">Dashboard Overview</h3>
        <p className="text-sm text-muted-foreground">Your weekly analytics show a 23% increase in engagement across all channels.</p>
        <p className="text-xs text-muted-foreground">Last updated: March 28, 2026</p>
      </div>
      <p className="text-xs text-error">No font smoothing — text may appear heavier and less crisp</p>
    </div>
  );
}
