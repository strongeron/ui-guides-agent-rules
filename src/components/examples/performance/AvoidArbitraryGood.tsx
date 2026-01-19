export function AvoidArbitraryGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Theme Token Usage</h4>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded">
            <code className="text-xs">p-4</code>
            <span className="text-sm text-muted-foreground ml-2">= 1rem (16px)</span>
          </div>
          <div className="text-foreground">
            <code className="text-xs bg-muted px-1 rounded">text-foreground</code>
            <span className="text-sm text-muted-foreground ml-2">= semantic color</span>
          </div>
          <div className="w-80 h-8 bg-primary/20 rounded flex items-center justify-center">
            <code className="text-xs">w-80</code>
            <span className="text-sm text-muted-foreground ml-2">= 20rem</span>
          </div>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        <strong className="text-foreground">Benefits:</strong>
        <ul className="mt-1 space-y-1">
          <li>Consistent spacing scale</li>
          <li>Smaller CSS bundle (reused classes)</li>
          <li>Design system compliance</li>
        </ul>
      </div>
      <p className="text-xs text-success">
        Theme tokens ensure consistency and optimize CSS output
      </p>
    </div>
  );
}
