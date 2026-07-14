/**
 * BAD: a paint-heavy animation on a full-bleed surface.
 * Panning a background and pulsing a filter forces the browser to re-raster the
 * entire hero on every single frame — ~100,000 pixels of paint work, 60 times a second.
 */
export function SurfaceSizeBudgetBad() {
  return (
    <div className="space-y-3">
      <style>{`
        @keyframes ssb-pan { to { background-position: 240px 0; } }
        @keyframes ssb-pulse {
          0%, 100% { filter: blur(0px) brightness(1); }
          50%      { filter: blur(4px) brightness(1.15); }
        }
        .ssb-hero-bad {
          background-image: repeating-linear-gradient(45deg, currentColor 0 2px, transparent 2px 12px);
          animation: ssb-pan 3s linear infinite, ssb-pulse 3s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) { .ssb-hero-bad { animation: none; } }
      `}</style>

      <div className="ssb-hero-bad flex h-40 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
        <span className="rounded-md bg-card px-3 py-1 text-sm font-medium text-foreground">
          Full-bleed hero
        </span>
      </div>

      <p className="text-xs text-destructive">
        Both properties are paint-triggering and the surface is the whole viewport band: every frame
        re-rasters ~102,400px (640 x 160). Continuous, large, and paint-heavy — all three at once.
      </p>
    </div>
  );
}
