export function ColorHarmonyGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Harmonious Colors</h4>
        <div className="space-y-3 p-4 bg-muted rounded-lg">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm">
              Primary
            </button>
            <button className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm">
              Secondary
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="text-success">Success: Operation completed</div>
            <div className="text-destructive">Error: Something went wrong</div>
            <div className="text-warning">Warning: Please review</div>
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code>Design tokens: primary, success, destructive</code>
        </div>
      </div>
      <p className="text-xs text-success">
        Cohesive palette from design system tokens
      </p>
    </div>
  );
}
