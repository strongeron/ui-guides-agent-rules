export function MobileFirstBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Desktop-First Layout</h4>
        <div className="flex flex-row sm:flex-col gap-4">
          <div className="flex-1 p-4 bg-primary/10 rounded-lg text-center">
            <span className="text-sm font-medium">Card 1</span>
          </div>
          <div className="flex-1 p-4 bg-primary/10 rounded-lg text-center">
            <span className="text-sm font-medium">Card 2</span>
          </div>
        </div>
        <div className="mt-4 bg-muted rounded p-3 font-mono text-xs">
          <code className="text-error">flex flex-row sm:flex-col</code>
        </div>
      </div>
      <div className="text-sm text-muted-foreground space-y-1">
        <p><strong>Base:</strong> Side by side (fights mobile)</p>
        <p><strong>sm+:</strong> Stacked (override needed)</p>
      </div>
      <p className="text-xs text-error">
        Desktop-first requires overrides at every breakpoint
      </p>
    </div>
  );
}
