/**
 * Bad: the article is rendered straight into the (simulated) mobile viewport
 * with no wrapping container, so every paragraph runs flush into both edges.
 * The detector fires: a <p> over 40 characters, wider than 50% of the viewport,
 * with its left edge less than 16px from the viewport edge. Gutter: 0px.
 */
export function ImpeccableBodyTextViewportEdgeBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      {/* Simulated phone viewport */}
      <div className="mx-auto w-[280px] overflow-hidden rounded-2xl border border-border bg-card">
        <div className="border-b border-border bg-muted py-2 text-center text-[10px] text-muted-foreground">
          viewport &mdash; 280px
        </div>

        {/* No horizontal padding anywhere: text meets glass */}
        <div className="py-4">
          <h4 className="text-sm font-semibold text-foreground">Shipping the redesign</h4>
          <p className="mt-2 text-xs leading-relaxed text-foreground">
            We rebuilt the dashboard around a single column so the primary action is always the
            first thing you reach, on any screen size.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-foreground">
            Every line of this paragraph starts and ends against the edge of the screen, which is
            exactly where a thumb and a rounded corner already live.
          </p>
        </div>
      </div>

      <p className="text-xs text-error">
        0px gutter. The paragraphs bleed to both edges &mdash; the eye has no margin to return to
        on each wrap, and on a real phone the text collides with the rounded corners and the hand
        holding the device.
      </p>
    </div>
  );
}
