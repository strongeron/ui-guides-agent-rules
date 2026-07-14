export function OgImageAbsoluteUrlBad() {
  return (
    <div className="w-full space-y-4">
      {/* Mock Slack / iMessage share card */}
      <div className="rounded-lg border border-border bg-card p-3">
        <p className="mb-2 text-xs text-muted-foreground">Shared in Slack</p>
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="flex aspect-[1200/630] items-center justify-center bg-muted">
            <span className="text-xs text-muted-foreground">
              image failed to load
            </span>
          </div>
          <div className="bg-background p-3">
            <p className="text-xs text-muted-foreground">myapp.com</p>
            <p className="text-sm font-medium text-foreground">Pricing — MyApp</p>
          </div>
        </div>
      </div>

      <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs text-foreground"><code>{`<meta property="og:image" content="/og.png" />`}</code></pre>

      <p className="text-xs text-error">
        Renders fine in dev, blank grey card everywhere else. The crawler has no page to resolve
        "/og.png" against, so it drops the image — and nothing in your build ever tells you.
      </p>
    </div>
  );
}
