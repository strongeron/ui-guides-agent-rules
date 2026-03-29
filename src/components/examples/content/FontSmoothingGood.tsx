export function FontSmoothingGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3 antialiased">
        <h3 className="text-lg font-semibold text-foreground">Dashboard Overview</h3>
        <p className="text-sm text-muted-foreground">Your weekly analytics show a 23% increase in engagement across all channels.</p>
        <p className="text-xs text-muted-foreground">Last updated: March 28, 2026</p>
      </div>
      <p className="text-xs text-success">antialiased — crisp, consistent text rendering</p>
    </div>
  );
}
