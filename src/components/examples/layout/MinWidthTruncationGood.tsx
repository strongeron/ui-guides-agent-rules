export function MinWidthTruncationGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-3 overflow-hidden">
        {/* min-w-0 overrides min-width: auto, letting the flex child shrink
            below its content so text-overflow: ellipsis can finally apply. */}
        <div className="flex items-center gap-3">
          <div className="shrink-0 size-9 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
            AK
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              quarterly-financial-report-final-v7-approved.pdf
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Shared by Alexandra Kowalski &middot; 2.4 MB
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Download
          </button>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        min-w-0 on the flex child: the filename ellipsizes and the Download button stays inside the
        card at every width.
      </p>
    </div>
  );
}
