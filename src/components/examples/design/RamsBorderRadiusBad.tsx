export function RamsBorderRadiusBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Inconsistent Border Radius</h4>
        <div className="space-y-3 p-4 bg-muted rounded-lg">
          <div className="p-4 bg-background border border-border rounded-none">
            <p className="text-sm mb-3">Sharp card (0px)</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Very round input"
                className="flex-1 px-3 py-2 border border-border rounded-2xl bg-background text-sm"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-sm text-sm">
                Tiny radius
              </button>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <span className="px-3 py-1 bg-primary text-primary-foreground rounded-lg text-xs">
              Large badge
            </span>
            <div className="w-8 h-8 bg-primary rounded-md" />
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code className="text-error">rounded-none, rounded-2xl, rounded-sm - chaos</code>
        </div>
      </div>
      <p className="text-xs text-error">
        Random radii - sharp corners next to very rounded
      </p>
    </div>
  );
}
