export function OgImageAbsoluteUrlGood() {
  return (
    <div className="w-full space-y-4">
      {/* Mock Slack / iMessage share card */}
      <div className="rounded-lg border border-border bg-card p-3">
        <p className="mb-2 text-xs text-muted-foreground">Shared in Slack</p>
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="flex aspect-[1200/630] flex-col items-center justify-center gap-1 bg-accent">
            <span className="text-base font-semibold text-accent-foreground">MyApp</span>
            <span className="text-xs text-accent-foreground">Pricing that scales with you</span>
          </div>
          <div className="bg-background p-3">
            <p className="text-xs text-muted-foreground">myapp.com</p>
            <p className="text-sm font-medium text-foreground">Pricing — MyApp</p>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">1200 × 630 — summary_large_image</p>
      </div>

      <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs text-foreground"><code>{`<meta property="og:image" content="https://myapp.com/og.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />`}</code></pre>

      <p className="text-xs text-success">
        Absolute URL, stable 1200 × 630 aspect, twitter:card set. Build the URL from one
        site-wide base constant so no page can forget the origin.
      </p>
    </div>
  );
}
