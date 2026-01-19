export function ContentPathsBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Content Configuration</h3>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`content: [
  './src/pages/**/*.jsx',
]`}</pre>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-error" />
            <span className="text-sm">Missing ./components directory</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-error" />
            <span className="text-sm">No TypeScript files (.tsx)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-error" />
            <span className="text-sm">Classes in components won't work</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-error">
        Incomplete paths cause missing styles in production builds
      </p>
    </div>
  );
}
