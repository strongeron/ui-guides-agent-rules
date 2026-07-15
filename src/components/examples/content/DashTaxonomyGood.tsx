export function DashTaxonomyGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-2 rounded-lg border border-border bg-card p-4 text-sm text-foreground">
        <p>
          Fiscal year <span className="font-mono">2020–2024</span>{' '}
          <span className="text-muted-foreground">en dash · range</span>
        </p>
        <p>
          See pages <span className="font-mono">10–20</span>{' '}
          <span className="text-muted-foreground">en dash · range</span>
        </p>
        <p>
          A <span className="font-mono">well-known</span> fix{' '}
          <span className="text-muted-foreground">hyphen · compound</span>
        </p>
        <p>
          It worked—eventually.{' '}
          <span className="text-muted-foreground">em dash · sentence break</span>
        </p>
      </div>
      <p className="mt-4 text-xs text-success">
        En dash for ranges, hyphen for compounds, em dash for breaks — the right glyph for each job.
      </p>
    </div>
  );
}
