export function PurgeOptimizationGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Optimized Configuration</h4>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`content: [
  './src/**/*.{ts,tsx}',
  './components/**/*.tsx',
  './app/**/*.{ts,tsx,mdx}',
],
safelist: [
  // Only CMS-driven classes
  { pattern: /^prose-/ }
]`}</pre>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-success/10 border border-success/30 rounded-lg p-3">
          <div className="font-medium text-success mb-1">Build Time</div>
          <div className="text-2xl font-bold">~2s</div>
        </div>
        <div className="bg-success/10 border border-success/30 rounded-lg p-3">
          <div className="font-medium text-success mb-1">CSS Size</div>
          <div className="text-2xl font-bold">~8KB</div>
        </div>
      </div>
      <p className="text-xs text-success">
        Specific paths and minimal safelist = fast builds, small CSS
      </p>
    </div>
  );
}
