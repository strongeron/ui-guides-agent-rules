export function ThemeConfigBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Direct theme Override</h4>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-error">{`theme: {
  colors: {
    brand: '#0066cc',
  }
  // Overwrites ALL defaults!
}`}</pre>
        </div>
      </div>
      <div className="space-y-2">
        <h5 className="text-sm font-medium">Available Colors:</h5>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <span className="w-4 h-4 rounded bg-primary" />
            <span className="text-xs">brand</span>
          </div>
          <span className="text-xs text-error line-through">red</span>
          <span className="text-xs text-error line-through">blue</span>
          <span className="text-xs text-error line-through">green</span>
          <span className="text-xs text-error line-through">slate</span>
        </div>
        <p className="text-xs text-error mt-2">All default colors removed!</p>
      </div>
      <p className="text-xs text-error">
        Overwriting theme keys removes all default values
      </p>
    </div>
  );
}
