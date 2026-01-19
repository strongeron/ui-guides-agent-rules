export function RamsColorContrastGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Good UI Contrast</h4>
        <div className="space-y-3 p-4 bg-background rounded-lg">
          <input
            type="text"
            placeholder="Visible border"
            className="w-full px-3 py-2 border-2 border-border rounded-md bg-background text-sm"
          />
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
              Primary
            </button>
            <button className="px-4 py-2 border-2 border-border rounded-md text-sm hover:bg-muted">
              Secondary
            </button>
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code>border-2 border-border (3:1+ contrast)</code>
        </div>
      </div>
      <p className="text-xs text-success">
        UI elements clearly visible against background
      </p>
    </div>
  );
}
