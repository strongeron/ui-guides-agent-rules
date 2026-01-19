export function RamsTabindexBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Disrupted Tab Order</h4>
        <div className="space-y-3">
          <div className="flex flex-col gap-2 p-3 bg-muted rounded-lg">
            <input
              type="text"
              placeholder="Visual 1st, tab 3rd"
              tabIndex={3}
              className="px-3 py-2 border border-border rounded-md bg-background text-sm"
            />
            <input
              type="text"
              placeholder="Visual 2nd, tab 1st"
              tabIndex={1}
              className="px-3 py-2 border border-border rounded-md bg-background text-sm"
            />
            <button
              tabIndex={2}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm"
            >
              Visual 3rd, tab 2nd
            </button>
          </div>
          <div className="bg-muted rounded p-2 font-mono text-xs">
            <code className="text-error">tabIndex=3, tabIndex=1, tabIndex=2</code>
          </div>
        </div>
      </div>
      <p className="text-xs text-error">
        Try tabbing - order is confusing and unpredictable
      </p>
    </div>
  );
}
