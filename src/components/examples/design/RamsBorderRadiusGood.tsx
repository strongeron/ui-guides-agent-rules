export function RamsBorderRadiusGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Consistent Border Radius</h4>
        <div className="space-y-3 p-4 bg-muted rounded-lg">
          <div className="p-4 bg-background border border-border rounded-lg">
            <p className="text-sm mb-3">Card with rounded-lg (8px)</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Input (6px)"
                className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-sm"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
                Button
              </button>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs">
              Pill badge
            </span>
            <div className="w-8 h-8 bg-primary rounded-full" />
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code>rounded-lg (8px), rounded-md (6px), rounded-full</code>
        </div>
      </div>
      <p className="text-xs text-success">
        Consistent radius scale creates visual harmony
      </p>
    </div>
  );
}
