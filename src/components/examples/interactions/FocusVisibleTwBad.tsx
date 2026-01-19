export function FocusVisibleTwBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Focus Buttons (Not Visible)</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Click with mouse - notice the ring appears even on click.
        </p>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            Button 1
          </button>
          <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            Button 2
          </button>
        </div>
        <div className="mt-4 bg-muted rounded p-3 font-mono text-xs">
          <code className="text-error">focus:ring-2</code>
        </div>
      </div>
      <p className="text-xs text-error">
        Ring appears on every focus, including mouse clicks
      </p>
    </div>
  );
}
