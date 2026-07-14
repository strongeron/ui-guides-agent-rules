export function ThemeNotRootGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-1">Declared in @theme</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Same value. The <code className="font-mono">--color-*</code> namespace is what generates utilities.
        </p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`@theme {
  --color-brand: oklch(0.62 0.19 259);
}`}</pre>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h5 className="text-sm font-medium mb-1">What the markup turns into</h5>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto mt-3">
          <pre className="text-foreground">{`<button class="bg-brand ring-brand hover:bg-brand/90">
<span   class="text-brand">
<div    class="border-brand">`}</pre>
        </div>
        <ul className="mt-3 text-xs space-y-2">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-success" />
            <span>Variants, opacity modifiers, and autocomplete all work.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-success" />
            <span>
              Still a real custom property: <code className="font-mono">var(--color-brand)</code> resolves anywhere.
            </span>
          </li>
        </ul>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h5 className="text-sm font-medium mb-2">The namespace does the work</h5>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <code className="font-mono bg-muted px-1.5 py-0.5 rounded">--color-*</code>
            <span className="text-muted-foreground">bg-, text-, border-, ring-</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="font-mono bg-muted px-1.5 py-0.5 rounded">--spacing-*</code>
            <span className="text-muted-foreground">p-, m-, gap-, w-</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="font-mono bg-muted px-1.5 py-0.5 rounded">--font-*</code>
            <span className="text-muted-foreground">font-</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-success">
        A token in @theme is both a CSS variable and a set of utilities. In :root it is only the first.
      </p>
    </div>
  );
}
