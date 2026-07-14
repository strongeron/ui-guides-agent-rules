/**
 * Good: two answers, picked by surface.
 *
 * 1. Marketing page → bound the clamp. `clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem)`
 *    runs 24px → 40px: a 1.7x ratio, inside the ~2.5x ceiling. The rem offset in
 *    the middle term keeps the user's font-size preference in the calculation,
 *    so zoom and reflow still work.
 * 2. Product UI → do not use fluid type at all. Material, Polaris, Primer and
 *    Carbon all ship fixed rem scales, because a heading that shrinks when the
 *    sidebar opens looks worse, not better.
 *
 * (`cqw` stands in for `vw` below so both ends are visible side by side.)
 */
export function ImpeccableFluidTypeBoundsGood() {
  const bounded = 'clamp(1.5rem, 1.2rem + 1.5cqw, 2.5rem)';

  return (
    <div className="w-full space-y-4">
      <div>
        <p className="mb-1 text-xs font-semibold text-foreground">Marketing page — bounded clamp</p>
        <div className="overflow-x-auto">
          <div className="flex gap-3">
            <div className="shrink-0">
              <p className="mb-1 text-xs text-muted-foreground">320px viewport → 24px</p>
              <div
                className="rounded-lg border border-border bg-card p-3"
                style={{ containerType: 'inline-size', width: '320px' }}
              >
                <h4
                  className="font-semibold text-foreground"
                  style={{ fontSize: bounded, lineHeight: 1.2 }}
                >
                  Ship faster
                </h4>
                <p className="mt-1 text-[1rem] leading-[1.6] text-muted-foreground">
                  Body copy stays fixed at 16px. The heading still outranks it.
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <p className="mb-1 text-xs text-muted-foreground">1100px viewport → 36px</p>
              <div
                className="rounded-lg border border-border bg-card p-3"
                style={{ containerType: 'inline-size', width: '1100px' }}
              >
                <h4
                  className="font-semibold text-foreground"
                  style={{ fontSize: bounded, lineHeight: 1.2 }}
                >
                  Ship faster
                </h4>
                <p className="mt-1 text-[1rem] leading-[1.6] text-muted-foreground">
                  It grew, but it never starts shouting. 24px → 40px is a 1.7x range.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-1 text-xs font-semibold text-foreground">
          Product UI — a fixed rem scale, no clamp
        </p>
        <div className="rounded-lg border border-border bg-card p-3">
          <h4 className="text-[1.25rem] font-semibold leading-[1.3] text-foreground">
            Deployments
          </h4>
          <p className="mt-1 text-[0.875rem] leading-[1.5] text-muted-foreground">
            1.25rem heading / 0.875rem body — same size in a 320px sidebar and on a 2560px monitor.
            Predictable, which is what a dense, container-based layout needs.
          </p>
        </div>
      </div>

      <p className="text-xs text-success">
        Bounded to 1.7x (max &le; ~2.5x min) with a rem offset so zoom keeps working &mdash; and the
        product UI opts out of fluid type entirely, which is what every major design system does.
      </p>
    </div>
  );
}
