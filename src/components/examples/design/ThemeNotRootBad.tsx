export function ThemeNotRootBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-1">Declared in :root</h4>
        <p className="text-xs text-muted-foreground mb-3">
          A perfectly valid CSS variable. Tailwind never sees it.
        </p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-error">{`:root {
  --brand: oklch(0.62 0.19 259);
}`}</pre>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h5 className="text-sm font-medium mb-1">What the markup turns into</h5>
        <p className="text-xs text-muted-foreground mb-3">
          No <code className="font-mono">bg-brand</code> exists, so every call site pays in arbitrary values.
        </p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-error">{`<button class="bg-[var(--brand)] ring-[var(--brand)]">
<span   class="text-[var(--brand)]">
<div    class="border-[var(--brand)]">`}</pre>
        </div>
        <ul className="mt-3 text-xs space-y-2">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>No autocomplete, no hover docs — the token is invisible to tooling.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>Nothing errors. It works, it is just noise forever.</span>
          </li>
        </ul>
      </div>

      <p className="text-xs text-error">
        :root defines a variable. It does not define a utility.
      </p>
    </div>
  );
}
