export function MinWidthTruncationBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-3 overflow-hidden">
        {/* The middle column is a flex child with the default min-width: auto.
            It refuses to shrink below its content, so `truncate` never kicks in. */}
        <div className="flex items-center gap-3">
          <div className="shrink-0 size-9 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
            AK
          </div>
          <div className="flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              quarterly-financial-report-final-v7-approved.pdf
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Shared by Alexandra Kowalski &middot; 2.4 MB
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground"
          >
            Download
          </button>
        </div>
      </div>
      <p className="text-xs text-error mt-4">
        No min-w-0: the flex child will not shrink, truncate does nothing, and the row blows out
        &mdash; the Download button is pushed outside the card.
      </p>
    </div>
  );
}
