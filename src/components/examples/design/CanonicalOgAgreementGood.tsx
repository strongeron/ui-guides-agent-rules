function ShareCard({ url, label }: { url: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="flex h-14 items-center justify-center bg-accent">
        <span className="text-xs text-accent-foreground">{label}</span>
      </div>
      <div className="bg-background p-2">
        <p className="truncate text-xs text-muted-foreground">{url}</p>
        <p className="text-xs font-medium text-foreground">Shipping fast — MyApp Blog</p>
      </div>
    </div>
  );
}

export function CanonicalOgAgreementGood() {
  const url = 'myapp.com/blog/post';

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-foreground">What the crawler indexes</p>
          <ShareCard label="canonical" url={url} />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-foreground">What the share links to</p>
          <ShareCard label="og:url" url={url} />
        </div>
      </div>

      <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs text-foreground"><code>{`const canonical = \`\${SITE_URL}/blog/post\`; // one value, two tags

<link rel="canonical" href={canonical} />
<meta property="og:url" content={canonical} />`}</code></pre>

      <p className="text-xs text-success">
        Both tags read the same variable, so they cannot drift. Keep campaign parameters in the link
        you hand out, never in the tags the page declares about itself.
      </p>
    </div>
  );
}
