export function RamsInconsistentSpacingGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Consistent Spacing</h4>
        <div className="space-y-3 p-3 bg-muted rounded-lg">
          <div className="p-3 bg-background rounded border border-border">
            <div className="font-medium">Card One</div>
            <div className="text-sm text-muted-foreground">Description text</div>
          </div>
          <div className="p-3 bg-background rounded border border-border">
            <div className="font-medium">Card Two</div>
            <div className="text-sm text-muted-foreground">Description text</div>
          </div>
          <div className="p-3 bg-background rounded border border-border">
            <div className="font-medium">Card Three</div>
            <div className="text-sm text-muted-foreground">Description text</div>
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code>space-y-3 (12px gaps throughout)</code>
        </div>
      </div>
      <p className="text-xs text-success">
        Even spacing creates visual rhythm and hierarchy
      </p>
    </div>
  );
}
