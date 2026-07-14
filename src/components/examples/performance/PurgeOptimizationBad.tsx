export function PurgeOptimizationBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="text-sm font-medium mb-1">tailwind.config.js</h4>
        <p className="text-xs text-muted-foreground mb-3">Tailwind v4 — <code>safelist</code> no longer exists</p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`export default {
  content: ['./**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'bg-red-500', 'bg-blue-500',
    'text-red-500', 'text-blue-500',
    // ...100 more, "just in case"
  ],
}`}</pre>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-error" />
          <span className="text-sm">
            <code>safelist</code> is silently ignored — the CMS colors never ship
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-error" />
          <span className="text-sm">
            The bug surfaces in production, as unstyled badges
          </span>
        </div>
      </div>
      <p className="text-xs text-destructive">
        A dead config that reads as a fix. Worse than no safelist at all, because it looks like the problem was handled
      </p>
    </div>
  );
}
