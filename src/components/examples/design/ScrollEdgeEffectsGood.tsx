export function ScrollEdgeEffectsGood() {
  return (
    <div className="space-y-3">
      <style>{`
        /* Fade the content out exactly where the floating header sits over it.
           Only the top edge: nothing floats over the bottom, so nothing fades there. */
        .see-scroll {
          --fade: 56px;
          mask-image: linear-gradient(
            to bottom,
            transparent 0,
            black var(--fade),
            black 100%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0,
            black var(--fade),
            black 100%
          );
        }
      `}</style>

      <div className="relative h-56 overflow-hidden rounded-lg border border-border bg-card">
        {/* Floating chrome: translucent, no divider. The seam is made of depth, not a line. */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-card/60 px-4 py-3 backdrop-blur-md">
          <span className="text-sm font-semibold text-foreground">Changelog</span>
          <span className="text-xs text-muted-foreground">v4.2</span>
        </div>

        <div className="see-scroll h-full overflow-y-auto px-4 pb-4 pt-14">
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i} className="mb-3 text-sm leading-relaxed text-foreground">
              <span className="font-medium">4.2.{10 - i}</span> — Scroll this list. Each line dissolves as
              it passes under the header instead of being cut by it.
            </p>
          ))}
        </div>
      </div>

      <p className="text-xs text-success">
        A <code>mask-image</code> gradient fades the last ~56px of the scroll container to transparent,
        precisely where the floating header overlaps it, so content recedes under the chrome rather than
        being sliced by it — and no divider is needed to sell the layering. Note the constraint that keeps
        this from becoming decoration: mask <strong>only where floating UI actually overlaps content</strong>.
        The bottom edge has nothing floating over it, so it gets no fade; a gratuitous one there would just
        eat readable text.
      </p>
    </div>
  );
}
