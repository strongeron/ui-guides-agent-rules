export function RamsTextContrastGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Good Text Contrast</h4>
        <div className="space-y-3 p-4 bg-background rounded-lg border border-border">
          <h5 className="text-lg font-semibold text-foreground">
            Card Title
          </h5>
          <p className="text-sm text-foreground">
            This is primary text with high contrast (~15:1 ratio) - easy to read in any condition.
          </p>
          <p className="text-sm text-muted-foreground">
            Secondary text maintains readable contrast (~7:1) while being visually subordinate.
          </p>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code>text-foreground (~15:1), text-muted-foreground (~7:1)</code>
        </div>
      </div>
      <p className="text-xs text-success">
        All text passes WCAG AA contrast requirements
      </p>
    </div>
  );
}
