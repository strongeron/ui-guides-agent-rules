export function FocusWithinGroupBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-4">
          Tab through the field. Only the bare <code>&lt;input&gt;</code> lights up — a ring floating inside the box.
          Focus the &ldquo;Max&rdquo; button and the field gives no sign it is active at all.
        </p>

        <label htmlFor="bad-amount" className="block text-sm font-medium text-foreground mb-1.5">
          Amount
        </label>

        {/* The wrapper is the visual control, but nothing on it reacts to focus. */}
        <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2">
          <span className="text-sm text-muted-foreground">$</span>
          <input
            id="bad-amount"
            type="text"
            inputMode="decimal"
            defaultValue="1,250.00"
            // The ring is on the inner input only, so it hugs the text box, not the control.
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-ring rounded"
          />
          <button
            type="button"
            className="shrink-0 rounded px-2 py-0.5 text-xs font-medium text-muted-foreground hover:bg-muted"
          >
            Max
          </button>
        </div>
      </div>
      <p className="text-xs text-error mt-4">
        The ring is trapped on one child — the compound control never reads as focused
      </p>
    </div>
  );
}
