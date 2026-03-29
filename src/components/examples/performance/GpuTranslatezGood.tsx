export function GpuTranslateZGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <div className="space-y-2">
          <div className="p-2 bg-muted rounded text-sm text-foreground">Static text element</div>
          <div className="p-2 bg-muted rounded text-sm text-foreground">Another static element</div>
          <div className="p-2 bg-primary/10 rounded text-sm text-foreground" style={{ transform: 'translateZ(0)' }}>
            ✨ Animated element (GPU accelerated)
          </div>
          <div className="p-2 bg-muted rounded text-sm text-foreground">No animation here</div>
        </div>
        <code className="text-xs bg-muted px-2 py-1 rounded text-foreground block">.animated {'{'} transform: translateZ(0) {'}'}</code>
      </div>
      <p className="text-xs text-success">translateZ(0) only on elements that need GPU acceleration</p>
    </div>
  );
}
