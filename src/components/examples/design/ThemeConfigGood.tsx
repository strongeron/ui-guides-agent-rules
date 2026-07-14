export function ThemeConfigGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-1">app.css</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Tokens are CSS custom properties. <code className="font-mono">@theme</code> extends the defaults.
        </p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`@import "tailwindcss";

@theme {
  --color-brand: oklch(0.62 0.19 259);
}`}</pre>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded bg-background border border-border px-2 py-1 font-mono">bg-brand</span>
          <span className="text-muted-foreground">generated, and every default still works</span>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h5 className="text-sm font-medium mb-1">Opt in to a reset</h5>
        <p className="text-xs text-muted-foreground mb-3">
          Clobbering is deliberate now: reset the namespace to <code className="font-mono">initial</code> first.
        </p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`@theme {
  --color-*: initial;        /* drop the built-ins */
  --color-brand: oklch(0.62 0.19 259);
  --color-surface: oklch(0.97 0 0);
}`}</pre>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Now <code className="font-mono">bg-red-500</code> no longer exists — a closed palette, on purpose.
        </p>
      </div>

      <p className="text-xs text-success">
        @theme adds to the defaults by default. You cannot wipe the palette by accident.
      </p>
    </div>
  );
}
