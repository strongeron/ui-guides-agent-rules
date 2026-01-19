export function RamsSemanticColorsBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Inconsistent Semantic Colors</h4>
        <div className="space-y-4 p-4 bg-muted rounded-lg">
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 text-xs rounded-full bg-destructive/20 text-destructive">Active</span>
            <span className="px-2 py-1 text-xs rounded-full bg-success/20 text-success">Inactive</span>
            <span className="px-2 py-1 text-xs rounded-full bg-info/20 text-info">Pending</span>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-destructive text-destructive-foreground rounded-md text-sm">
              Save
            </button>
            <button className="px-3 py-1.5 bg-success text-success-foreground rounded-md text-sm">
              Delete
            </button>
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code className="text-error">Red=Active? Green=Delete? Confusing!</code>
        </div>
      </div>
      <p className="text-xs text-error">
        Colors contradict expectations - users will make mistakes
      </p>
    </div>
  );
}
