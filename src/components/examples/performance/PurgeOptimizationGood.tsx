export function PurgeOptimizationGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="text-sm font-medium mb-1">app.css</h4>
        <p className="text-xs text-muted-foreground mb-3">Tailwind v4 — force-include from CSS</p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`@import "tailwindcss";

/* Badge colors come from the CMS at runtime,
   so they appear in no source file.
   Only the 4 the CMS can actually emit: */
@source inline("bg-{red,amber,emerald,sky}-100");

/* Skip a huge generated fixture directory */
@source not "./src/__fixtures__";`}</pre>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-success" />
          <span className="text-sm">
            Brace expansion keeps it to one line, not four
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-success" />
          <span className="text-sm">
            Scoped to the values the data can produce — not the whole palette
          </span>
        </div>
      </div>
      <p className="text-xs text-success">
        Expansion cuts both ways:{' '}
        <code>{'@source inline("{hover:,}bg-red-{50,{100..900..100},950}")'}</code> is legal and generates ~22
        utilities from one line. Inline the smallest set your data can actually produce
      </p>
    </div>
  );
}
