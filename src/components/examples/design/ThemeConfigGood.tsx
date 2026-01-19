export function ThemeConfigGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">theme.extend Usage</h4>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`theme: {
  extend: {
    colors: {
      brand: '#0066cc',
    }
  }
}`}</pre>
        </div>
      </div>
      <div className="space-y-2">
        <h5 className="text-sm font-medium">Available Colors:</h5>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <span className="w-4 h-4 rounded bg-red-500" />
            <span className="text-xs">red</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-4 h-4 rounded bg-blue-500" />
            <span className="text-xs">blue</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-4 h-4 rounded bg-green-500" />
            <span className="text-xs">green</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-4 h-4 rounded bg-primary" />
            <span className="text-xs">brand</span>
          </div>
          <span className="text-xs text-muted-foreground">+ all defaults</span>
        </div>
      </div>
      <p className="text-xs text-success">
        Extend adds custom values while preserving all defaults
      </p>
    </div>
  );
}
