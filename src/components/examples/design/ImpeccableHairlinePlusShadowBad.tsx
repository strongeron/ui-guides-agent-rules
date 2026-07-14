/**
 * Bad: `border` + `shadow-lg` on the same card — a visible 1px hairline on all four
 * sides while a 16px+ blur spills underneath. That is exactly what impeccable's
 * detector fires on (>= 2 sides at <= 1.5px with alpha >= 0.28, plus a shadow layer
 * whose blur is >= 16px), and it is the "I applied every card style I know" tell.
 *
 * The plate is pinned light on purpose: a soft shadow only reads on a light surface.
 */
export function ImpeccableHairlinePlusShadowBad() {
  return (
    <div className="w-full space-y-3">
      <p className="text-xs text-muted-foreground">One card, both treatments</p>

      <div className="rounded-xl bg-neutral-100 p-6">
        {/* border-neutral-200 is a fully opaque hairline; shadow-lg blurs at 15px+ */}
        <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-lg">
          <p className="text-sm font-semibold text-neutral-900">Usage this month</p>
          <p className="mt-1 text-sm text-neutral-500">
            A crisp edge, and a soft lift, at the same time.
          </p>
        </div>
      </div>

      <div className="rounded bg-muted p-2 font-mono text-xs">
        <code className="text-error">border border-neutral-200 + shadow-lg</code>
      </div>

      <p className="text-xs text-error">
        The two devices contradict each other. The hairline says &ldquo;this surface has a defined
        boundary and sits in the plane&rdquo;; the wide blur says &ldquo;this surface is floating,
        and its edge is soft because light wraps around it.&rdquo; Ship both and the edge fights the
        lift &mdash; the border stops the shadow selling elevation, the shadow stops the border
        reading as a deliberate line, and the card reads as cheap.
      </p>
    </div>
  );
}
