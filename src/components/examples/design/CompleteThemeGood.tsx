export function CompleteThemeGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Complete Token Pairs</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-primary text-primary-foreground rounded">
            <span className="text-sm">primary</span>
            <span className="text-xs opacity-80">+ foreground</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-secondary text-secondary-foreground rounded">
            <span className="text-sm">secondary</span>
            <span className="text-xs opacity-80">+ foreground</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-muted text-muted-foreground rounded">
            <span className="text-sm">muted</span>
            <span className="text-xs opacity-80">+ foreground</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-destructive text-destructive-foreground rounded">
            <span className="text-sm">destructive</span>
            <span className="text-xs opacity-80">+ foreground</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border">
          <input
            type="text"
            placeholder="Focus to see ring"
            className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      <p className="text-xs text-success">
        Every background has a matching foreground; ring color defined
      </p>
    </div>
  );
}
