export function FluidClampGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 overflow-hidden">
        <h2 className="font-semibold text-foreground mb-2" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}>Responsive Typography</h2>
        <p className="text-sm text-muted-foreground" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>This heading uses clamp() to fluidly scale between viewport sizes — no breakpoints needed.</p>
      </div>
      <p className="text-xs text-success">CSS clamp() — fluid scaling between min and max</p>
    </div>
  );
}
