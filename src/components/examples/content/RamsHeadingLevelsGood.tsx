export function RamsHeadingLevelsGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Sequential Headings</h4>
        <div className="p-3 bg-muted rounded-lg space-y-2">
          <div className="text-lg font-semibold">h1: Page Title</div>
          <div className="pl-4 space-y-2">
            <div className="text-base font-medium">h2: Features</div>
            <div className="pl-4 space-y-1">
              <div className="text-sm font-medium">h3: Speed</div>
              <div className="text-sm font-medium">h3: Security</div>
            </div>
            <div className="text-base font-medium">h2: Pricing</div>
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code>h1 → h2 → h3 (no skips)</code>
        </div>
      </div>
      <p className="text-xs text-success">
        Clear document outline for screen reader navigation
      </p>
    </div>
  );
}
