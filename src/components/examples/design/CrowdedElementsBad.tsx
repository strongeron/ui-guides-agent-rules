export function CrowdedElementsBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Crowded Elements</h4>
        <div className="p-2 bg-muted rounded-lg">
          <div className="p-2 bg-background rounded border border-border">
            <h5 className="font-medium text-sm">Card Title</h5>
            <p className="text-xs text-muted-foreground leading-tight">
              This card has minimal padding and tight spacing making it hard to read.
            </p>
            <div className="flex gap-1 mt-1">
              <button className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs">
                Action
              </button>
              <button className="px-2 py-1 border border-border rounded text-xs">
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code className="text-error">p-2, gap-1, no margins</code>
        </div>
      </div>
      <p className="text-xs text-error">
        Elements compete for attention - hard to read and tap
      </p>
    </div>
  );
}
