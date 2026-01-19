export function RamsTabindexGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Natural Tab Order</h4>
        <div className="space-y-3">
          <div className="flex flex-col gap-2 p-3 bg-muted rounded-lg">
            <input
              type="text"
              placeholder="First (tab order: 1)"
              className="px-3 py-2 border border-border rounded-md bg-background text-sm"
            />
            <input
              type="text"
              placeholder="Second (tab order: 2)"
              className="px-3 py-2 border border-border rounded-md bg-background text-sm"
            />
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
              Third (tab order: 3)
            </button>
          </div>
          <div className="bg-muted rounded p-2 font-mono text-xs">
            <code>No tabindex needed - DOM order = tab order</code>
          </div>
        </div>
      </div>
      <p className="text-xs text-success">
        Tab order matches visual order - predictable navigation
      </p>
    </div>
  );
}
