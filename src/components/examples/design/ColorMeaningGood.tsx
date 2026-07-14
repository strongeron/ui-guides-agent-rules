export function ColorMeaningGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Consistent Semantic Colors</h4>
        <div className="space-y-4 p-4 bg-muted rounded-lg">
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 text-xs rounded-full bg-success/20 text-success">Active</span>
            <span className="px-2 py-1 text-xs rounded-full bg-destructive/20 text-destructive">Inactive</span>
            <span className="px-2 py-1 text-xs rounded-full bg-warning/20 text-warning">Pending</span>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm">
              Save
            </button>
            <button className="px-3 py-1.5 bg-destructive text-destructive-foreground rounded-md text-sm">
              Delete
            </button>
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code>Green=success, Red=danger, Yellow=warning</code>
        </div>
      </div>
      <p className="text-xs text-success">
        Colors match user expectations - no confusion
      </p>
    </div>
  );
}
