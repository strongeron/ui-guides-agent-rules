export function RamsShadowConsistencyBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Inconsistent Shadows</h4>
        <div className="space-y-4 p-4 bg-muted rounded-lg">
          <div
            className="p-3 bg-background rounded-lg"
            style={{ boxShadow: '0 0 20px rgba(0,0,255,0.3)' }}
          >
            <p className="text-sm font-medium">Blue glow card</p>
            <p className="text-xs text-muted-foreground">Colored shadow</p>
          </div>
          <div className="p-3 bg-background rounded-lg shadow-2xl">
            <p className="text-sm font-medium">Very heavy shadow</p>
            <p className="text-xs text-muted-foreground">shadow-2xl - overboard</p>
          </div>
          <div
            className="p-3 bg-background rounded-lg"
            style={{ boxShadow: '5px 5px 0 black' }}
          >
            <p className="text-sm font-medium">Hard offset shadow</p>
            <p className="text-xs text-muted-foreground">Completely different style</p>
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code className="text-error">Blue glow, 2xl, hard offset - no system</code>
        </div>
      </div>
      <p className="text-xs text-error">
        Mixed shadow styles create visual chaos
      </p>
    </div>
  );
}
