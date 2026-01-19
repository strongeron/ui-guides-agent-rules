export function PurgeOptimizationBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Problematic Configuration</h4>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`content: [
  './**/*.{js,ts,jsx,tsx}',
  // Scans node_modules!
],
safelist: [
  'bg-red-500', 'bg-blue-500',
  'text-red-500', 'text-blue-500',
  // 100+ more classes...
]`}</pre>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-error/10 border border-error/30 rounded-lg p-3">
          <div className="font-medium text-error mb-1">Build Time</div>
          <div className="text-2xl font-bold">~45s</div>
        </div>
        <div className="bg-error/10 border border-error/30 rounded-lg p-3">
          <div className="font-medium text-error mb-1">CSS Size</div>
          <div className="text-2xl font-bold">~150KB</div>
        </div>
      </div>
      <p className="text-xs text-error">
        Broad globs and large safelists cause slow builds and bloated CSS
      </p>
    </div>
  );
}
