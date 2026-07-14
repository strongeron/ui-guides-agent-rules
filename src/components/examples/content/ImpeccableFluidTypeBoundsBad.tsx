/**
 * Bad: `clamp(1rem, 5vw, 6rem)` — a 6x range between the floor and the ceiling.
 *
 * The two boxes below are container-query contexts (`cqw` stands in for `vw` so
 * both ends are visible side by side without resizing the window).
 *
 * - Narrow (320px): 5cqw = 16px, which is the min — the headline is the exact
 *   size of body text. There is no hierarchy at all.
 * - Wide (1100px): 5cqw = 55px — the headline is shouting, four lines of
 *   whitespace where a heading used to be.
 *
 * Same declaration, absurd at both ends.
 */
export function ImpeccableFluidTypeBoundsBad() {
  return (
    <div className="w-full space-y-3">
      <div className="overflow-x-auto">
        <div className="flex gap-3">
          {/* Narrow end */}
          <div className="shrink-0">
            <p className="mb-1 text-xs text-muted-foreground">320px viewport</p>
            <div
              className="rounded-lg border border-error bg-card p-3"
              style={{ containerType: 'inline-size', width: '320px' }}
            >
              <h4
                className="font-semibold text-foreground"
                style={{ fontSize: 'clamp(1rem, 5cqw, 6rem)', lineHeight: 1.2 }}
              >
                Ship faster
              </h4>
              <p className="mt-1 text-[1rem] leading-[1.6] text-muted-foreground">
                Body copy is also 16px. The heading is indistinguishable from it.
              </p>
            </div>
          </div>

          {/* Wide end */}
          <div className="shrink-0">
            <p className="mb-1 text-xs text-muted-foreground">1100px viewport</p>
            <div
              className="rounded-lg border border-error bg-card p-3"
              style={{ containerType: 'inline-size', width: '1100px' }}
            >
              <h4
                className="font-semibold text-foreground"
                style={{ fontSize: 'clamp(1rem, 5cqw, 6rem)', lineHeight: 1.2 }}
              >
                Ship faster
              </h4>
              <p className="mt-1 text-[1rem] leading-[1.6] text-muted-foreground">
                Body copy is still 16px. The heading is now 55px and climbing.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-error">
        <code>clamp(1rem, 5vw, 6rem)</code> spans 16px to 96px &mdash; a 6x ratio, more than double
        the ~2.5x ceiling. At the low end the heading collapses into the body text; at the high end
        it dominates the page. A ratio this wide also breaks the browser&rsquo;s zoom and reflow
        behaviour, because the viewport unit ignores the user&rsquo;s font-size preference.
      </p>
    </div>
  );
}
