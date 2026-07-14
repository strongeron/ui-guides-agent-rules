export function RobotsIntentBad() {
  return (
    <div className="w-full space-y-4">
      {/* Failure 1: preview deploy is indexable */}
      <div className="rounded-lg border border-border bg-card p-3 space-y-1">
        <p className="mb-1 text-xs text-muted-foreground">Search: “myapp”</p>
        <div className="rounded-md border border-destructive p-2">
          <p className="text-xs text-muted-foreground">myapp-git-feat-x-acme.vercel.app</p>
          <p className="text-sm font-medium text-primary">MyApp (staging)</p>
        </div>
        <div className="rounded-md border border-border p-2">
          <p className="text-xs text-muted-foreground">myapp.com</p>
          <p className="text-sm font-medium text-primary">MyApp — Ship faster</p>
        </div>
        <p className="text-xs text-error">
          Every preview deploy is indexable, so your staging copy competes with production for your
          own brand name — and sometimes wins.
        </p>
      </div>

      {/* Failure 2: the overcorrection */}
      <div className="rounded-lg border border-border bg-card p-3 space-y-1">
        <p className="mb-1 text-xs text-muted-foreground">Search: “myapp” — after someone “fixed” it</p>
        <div className="rounded-md border border-dashed border-border p-3">
          <p className="text-xs text-muted-foreground">No results for myapp.com</p>
        </div>
        <p className="text-xs text-error">
          The symmetric failure: a hardcoded noindex shipped to production and quietly deindexed the
          whole site.
        </p>
      </div>

      <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs text-foreground"><code>{`// preview: nothing at all — indexable
// "fix": <meta name="robots" content="noindex" />  ← now in prod too`}</code></pre>
    </div>
  );
}
