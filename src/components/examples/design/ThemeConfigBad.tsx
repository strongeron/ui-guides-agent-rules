export function ThemeConfigBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-1">tailwind.config.js</h4>
        <p className="text-xs text-muted-foreground mb-3">
          v3 API. A v4 project has no config file, so nothing loads this.
        </p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-error">{`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: { brand: 'oklch(0.62 0.19 259)' },
    },
  },
}`}</pre>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 space-y-2">
        <h5 className="text-sm font-medium">What v4 does with it</h5>
        <ul className="text-xs space-y-2">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>
              <code className="font-mono">theme.extend</code> does not exist in v4. This object is never read.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>
              No <code className="font-mono">bg-brand</code> utility is generated — the class silently does nothing.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>No build error. You find out when the button renders transparent.</span>
          </li>
        </ul>
      </div>

      <p className="text-xs text-error">
        Extend-vs-overwrite was a v3 problem. This config answers a question v4 no longer asks.
      </p>
    </div>
  );
}
