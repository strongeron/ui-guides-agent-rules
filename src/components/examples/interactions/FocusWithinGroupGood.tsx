export function FocusWithinGroupGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-4">
          Tab through the field. The whole control lights up whether focus lands on the input or on
          &ldquo;Max&rdquo;, because the ring lives on the wrapper.
        </p>

        <label htmlFor="good-amount" className="block text-sm font-medium text-foreground mb-1.5">
          Amount
        </label>

        {/* :focus-within promotes focus on any descendant to the wrapper, which is the real control. */}
        <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 transition-shadow focus-within:border-ring focus-within:ring-2 focus-within:ring-ring">
          <span className="text-sm text-muted-foreground">$</span>
          <input
            id="good-amount"
            type="text"
            inputMode="decimal"
            defaultValue="1,250.00"
            // Children suppress their own rings; the group owns the focus affordance.
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none"
          />
          <button
            type="button"
            className="shrink-0 rounded px-2 py-0.5 text-xs font-medium text-muted-foreground outline-none hover:bg-muted focus-visible:bg-muted focus-visible:text-foreground"
          >
            Max
          </button>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        <code>:focus-within</code> on the wrapper makes the whole compound control read as one focused thing
      </p>
    </div>
  );
}
