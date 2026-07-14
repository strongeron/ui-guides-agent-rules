export function ContentPathsGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-1">app.css</h3>
        <p className="text-xs text-muted-foreground mb-3">Tailwind v4 — sources are detected, not configured</p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`@import "tailwindcss";

/* Only what auto-detection cannot see:
   node_modules is gitignored, so it is skipped */
@source "../node_modules/@acme/ui/dist";`}</pre>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-start gap-2">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-success" />
            <span className="text-sm">
              Your own <code>src/</code> needs no configuration — Tailwind walks it
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-success" />
            <span className="text-sm">
              <code>.gitignore</code> and binary files are skipped automatically
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-success" />
            <span className="text-sm">
              <code>@source</code> registers the one blind spot: a gitignored UI package
            </span>
          </div>
        </div>
      </div>
      <p className="text-xs text-success">
        Escape hatches when you need them: <code>@source not "…"</code> excludes a scanned path, and{' '}
        <code>@import "tailwindcss" source(none)</code> turns detection off entirely
      </p>
    </div>
  );
}
