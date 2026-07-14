function ShareCard({ url, label }: { url: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="flex h-14 items-center justify-center bg-muted">
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="bg-background p-2">
        <p className="truncate text-xs text-muted-foreground">{url}</p>
        <p className="text-xs font-medium text-foreground">Shipping fast — MyApp Blog</p>
      </div>
    </div>
  );
}

export function CanonicalOgAgreementBad() {
  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-foreground">What the crawler indexes</p>
          <ShareCard label="canonical" url="myapp.com/blog/post" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-foreground">What the share links to</p>
          <ShareCard label="og:url" url="myapp.com/blog/post?ref=twitter&utm_source=x" />
        </div>
      </div>

      <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs text-foreground"><code>{`<link rel="canonical" href="https://myapp.com/blog/post" />
<meta property="og:url"
      content="https://myapp.com/blog/post?ref=twitter&utm_source=x" />`}</code></pre>

      <p className="text-xs text-error">
        One page, two URLs. Every share points at the tracked variant, so the links that page earns
        accrue to a URL the canonical disowns — and the crawler now has a duplicate to reconcile.
      </p>
    </div>
  );
}
