const TITLE = 'Home | Best Free AI Tools 2026 | Fast | Cheap | MyApp';
const SERP_TITLE_BUDGET = 60;

export function MetaTitleAndDescriptionBad() {
  const overBudget = Math.max(0, TITLE.length - SERP_TITLE_BUDGET);
  const shown =
    overBudget > 0 ? `${TITLE.slice(0, SERP_TITLE_BUDGET).trimEnd()}…` : TITLE;

  return (
    <div className="w-full space-y-4">
      {/* Mock search result */}
      <div className="rounded-lg border border-border bg-card p-3 space-y-1">
        <p className="mb-1 text-xs text-muted-foreground">Search result</p>
        <p className="text-xs text-muted-foreground">myapp.com › home</p>
        <p className="text-sm font-medium text-primary">{shown}</p>
        <p className="text-xs text-muted-foreground italic">
          Skip to content. Toggle menu. Cookie preferences. We use cookies to improve your…
        </p>
        <p className="text-xs text-error">
          No meta description — the snippet is scraped from whatever body copy came first.
        </p>
      </div>

      {/* Character ruler */}
      <div className="space-y-1">
        <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-primary" style={{ width: `${(SERP_TITLE_BUDGET / TITLE.length) * 100}%` }} />
          <div className="h-full bg-destructive" style={{ width: `${(overBudget / TITLE.length) * 100}%` }} />
        </div>
        <p className="text-xs text-error">
          {TITLE.length} characters — {overBudget} past the ~{SERP_TITLE_BUDGET}-char budget, truncated away
        </p>
      </div>

      <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs text-foreground"><code>{`<title>${TITLE}</title>
<!-- no <meta name="description"> -->`}</code></pre>

      <p className="text-xs text-error">
        Keyword-stuffed and unreadable, and the part that identifies the product is the part that
        gets cut. With no description, the engine writes the snippet for you.
      </p>
    </div>
  );
}
