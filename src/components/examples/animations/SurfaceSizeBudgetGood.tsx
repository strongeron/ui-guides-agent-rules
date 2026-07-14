/**
 * GOOD: the identical effect, budgeted by surface size.
 * The paint-heavy pan + filter stays on a 32px icon — small and isolated, which the
 * rule explicitly allows. The hero gets the same sense of life from transform and
 * opacity on a promoted layer, which the compositor handles with no paint at all.
 */
export function SurfaceSizeBudgetGood() {
  return (
    <div className="space-y-3">
      <style>{`
        @keyframes ssb-pan-small { to { background-position: 24px 0; } }
        @keyframes ssb-pulse-small {
          0%, 100% { filter: blur(0px) brightness(1); }
          50%      { filter: blur(2px) brightness(1.15); }
        }
        /* Same two paint-heavy properties — on 1,024px instead of 102,400px. */
        .ssb-icon {
          background-image: repeating-linear-gradient(45deg, currentColor 0 2px, transparent 2px 6px);
          animation: ssb-pan-small 3s linear infinite, ssb-pulse-small 3s ease-in-out infinite;
        }
        /* The hero moves on the compositor: no layout, no paint, just re-blending a layer. */
        @keyframes ssb-drift {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%      { transform: translateX(8px); opacity: 0.88; }
        }
        .ssb-hero-good { will-change: transform; animation: ssb-drift 3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ssb-icon, .ssb-hero-good { animation: none; }
        }
      `}</style>

      <div className="flex h-40 items-center justify-center rounded-lg border border-border bg-muted">
        <div className="ssb-hero-good flex items-center gap-3 rounded-md bg-card px-3 py-2">
          <span className="ssb-icon size-8 rounded-sm text-muted-foreground" aria-hidden="true" />
          <span className="text-sm font-medium text-foreground">Full-bleed hero</span>
        </div>
      </div>

      <p className="text-xs text-success">
        Same properties, ~1/100th of the pixels: the icon is 32 x 32 = 1,024px of raster work per frame, the
        hero band was 102,400px. Size is the variable that decides — not the property name.
      </p>
    </div>
  );
}
