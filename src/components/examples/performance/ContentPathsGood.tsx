export function ContentPathsGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Content Configuration</h3>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`content: [
  './src/**/*.{js,ts,jsx,tsx}',
  './components/**/*.tsx',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
]`}</pre>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-success" />
            <span className="text-sm">All component files included</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-success" />
            <span className="text-sm">MDX content covered</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-success" />
            <span className="text-sm">Optimal purge in production</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-success">
        Comprehensive content paths ensure all classes are included and unused ones are purged
      </p>
    </div>
  );
}
