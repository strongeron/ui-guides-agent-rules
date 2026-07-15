export function DashTaxonomyBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-2 rounded-lg border border-border bg-card p-4 text-sm text-foreground">
        <p>Fiscal year <span className="font-mono">2020-2024</span></p>
        <p>See pages <span className="font-mono">10-20</span></p>
        <p>The <span className="font-mono">New York-London</span> route</p>
      </div>
      <p className="mt-4 text-xs text-destructive">
        Hyphens standing in for ranges — the reliable tell that text was never typeset.
      </p>
    </div>
  );
}
