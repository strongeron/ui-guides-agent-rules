export function CustomBreakpointsGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Named Breakpoints</h4>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto mb-4">
          <pre className="text-foreground">{`screens: {
  'sm': '640px',
  'md': '768px',
  'tablet': '960px',  // custom
  'lg': '1024px',
  'desktop': '1200px', // custom
}`}</pre>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <code className="text-xs bg-muted px-2 py-1 rounded">tablet:flex</code>
            <span className="text-muted-foreground">960px+</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-muted px-2 py-1 rounded">desktop:grid</code>
            <span className="text-muted-foreground">1200px+</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-success">
        Named breakpoints are reusable and self-documenting
      </p>
    </div>
  );
}
