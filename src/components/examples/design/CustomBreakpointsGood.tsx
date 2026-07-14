export function CustomBreakpointsGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-1">A breakpoint is a theme token</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Declare it in <code className="font-mono">@theme</code>; the variant comes with it.
        </p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`@theme {
  --breakpoint-3xl: 120rem;  /* 1920px */
}`}</pre>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h5 className="text-sm font-medium mb-3">What that generates</h5>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <code className="text-xs bg-muted px-2 py-1 rounded">3xl:flex</code>
            <span className="text-xs text-muted-foreground">at 120rem and up</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-muted px-2 py-1 rounded">max-3xl:hidden</code>
            <span className="text-xs text-muted-foreground">below it — no second number to keep in sync</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-muted px-2 py-1 rounded">3xl:grid-cols-4</code>
            <span className="text-xs text-muted-foreground">every variant, everywhere</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-success">
        One named token, sorted into the scale by its value. The width is written down exactly once.
      </p>
    </div>
  );
}
