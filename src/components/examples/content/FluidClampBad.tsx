export function FluidClampBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 overflow-hidden">
        <h2 className="text-4xl font-semibold text-foreground mb-2">Responsive Typography</h2>
        <p className="text-base text-muted-foreground">This heading uses a fixed 36px size. On small screens it overflows or wraps awkwardly. On large screens it may feel too small.</p>
      </div>
      <p className="text-xs text-error">Fixed font-size — doesn't adapt between viewports</p>
    </div>
  );
}
