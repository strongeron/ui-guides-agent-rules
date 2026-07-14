/**
 * BAD: div soup. It looks exactly right and announces nothing.
 * The "list" is a stack of divs — no item count, no list navigation. The "table" is
 * flexbox rows with a bold div header — a screen reader reading the cell in the middle
 * of the grid says "42", with no column and no row to attach it to.
 */
export function ListAndTableSemanticsBad() {
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Deploy steps</p>
        <div className="space-y-2">
          {['Install dependencies', 'Run tests', 'Build bundle', 'Upload artifact', 'Invalidate cache'].map(
            (step) => (
              <div key={step} className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground">
                {step}
              </div>
            )
          )}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Revenue</p>
        <div className="rounded-md border border-border">
          <div className="flex border-b border-border bg-muted">
            <div className="flex-1 px-3 py-2 text-xs font-bold text-foreground">Region</div>
            <div className="flex-1 px-3 py-2 text-xs font-bold text-foreground">Q2</div>
            <div className="flex-1 px-3 py-2 text-xs font-bold text-foreground">Q3</div>
          </div>
          {[
            ['EMEA', '38', '42'],
            ['AMER', '51', '55'],
          ].map((row) => (
            <div key={row[0]} className="flex border-b border-border last:border-b-0">
              {row.map((cell) => (
                <div key={cell} className="flex-1 px-3 py-2 text-sm text-foreground">
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-destructive">
        Announced for the EMEA/Q3 cell: <span className="font-mono">&ldquo;42&rdquo;</span>. That is all.
        No &ldquo;list, 5 items&rdquo;, no column, no row — bold is not a header, and a div is not an item.
      </p>
    </div>
  );
}
