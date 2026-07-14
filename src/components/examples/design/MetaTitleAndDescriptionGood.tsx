const TITLE = 'Pricing — MyApp';
const DESCRIPTION =
  'Compare MyApp plans: Free for solo projects, Pro for growing teams, Enterprise for scale. Transparent per-seat pricing, no setup fees, cancel any time.';
const SERP_TITLE_BUDGET = 60;
const SERP_DESC_BUDGET = 160;

export function MetaTitleAndDescriptionGood() {
  return (
    <div className="w-full space-y-4">
      {/* Mock search result */}
      <div className="rounded-lg border border-border bg-card p-3 space-y-1">
        <p className="mb-1 text-xs text-muted-foreground">Search result</p>
        <p className="text-xs text-muted-foreground">myapp.com › pricing</p>
        <p className="text-sm font-medium text-primary">{TITLE}</p>
        <p className="text-xs text-muted-foreground">{DESCRIPTION}</p>
      </div>

      {/* Character ruler */}
      <div className="space-y-2">
        <div className="space-y-1">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-success"
              style={{ width: `${(TITLE.length / SERP_TITLE_BUDGET) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Title: {TITLE.length}/{SERP_TITLE_BUDGET} characters — nothing truncated
          </p>
        </div>
        <div className="space-y-1">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-success"
              style={{ width: `${(DESCRIPTION.length / SERP_DESC_BUDGET) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Description: {DESCRIPTION.length}/{SERP_DESC_BUDGET} characters — plain text, written on purpose
          </p>
        </div>
      </div>

      <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs text-foreground"><code>{`// one template, every page: \`\${page} — \${SITE_NAME}\`
<title>${TITLE}</title>
<meta name="description" content="${DESCRIPTION}" />`}</code></pre>

      <p className="text-xs text-success">
        One title template site-wide, so every page reads the same way and the distinctive word comes
        first. A written description means the snippet says what you chose, not what the crawler found.
      </p>
    </div>
  );
}
