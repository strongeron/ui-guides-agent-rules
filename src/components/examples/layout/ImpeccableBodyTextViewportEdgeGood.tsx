/**
 * Good: the same article inside a container that supplies a 24px horizontal
 * gutter (well past the 16px floor) and a max-width with mx-auto, so the
 * measure stays readable once the viewport grows past the text column.
 */
export function ImpeccableBodyTextViewportEdgeGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      {/* Same simulated phone viewport */}
      <div className="mx-auto w-[280px] overflow-hidden rounded-2xl border border-border bg-card">
        <div className="border-b border-border bg-muted py-2 text-center text-[10px] text-muted-foreground">
          viewport &mdash; 280px
        </div>

        {/* px-6 = 24px gutter, plus a max-width + mx-auto for wider screens */}
        <div className="mx-auto max-w-[65ch] px-6 py-4">
          <h4 className="text-sm font-semibold text-foreground">Shipping the redesign</h4>
          <p className="mt-2 text-xs leading-relaxed text-foreground">
            We rebuilt the dashboard around a single column so the primary action is always the
            first thing you reach, on any screen size.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-foreground">
            Every line of this paragraph has room to breathe on both sides, so the eye lands
            cleanly at the start of the next one.
          </p>
        </div>
      </div>

      <p className="text-xs text-success">
        24px gutter on both sides &mdash; past the 16px floor, inside the 24&ndash;32px sweet spot
        &mdash; plus <code>max-width</code> and <code>mx-auto</code> so the measure holds when the
        viewport gets wider.
      </p>
    </div>
  );
}
