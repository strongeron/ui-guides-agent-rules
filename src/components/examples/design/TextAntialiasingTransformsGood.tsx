import { useState } from 'react';

/**
 * Good: the transform lives on a wrapper, and the text rides along inside it. One
 * transform, one origin — the lockup scales as a single object and its internal
 * geometry is preserved.
 *
 * The wrapper is promoted to its own compositor layer for the duration of the
 * animation (`transform-gpu` = translateZ(0), plus `will-change: transform`), so the
 * glyphs are rasterized once and then merely re-composited — no per-frame smoothing
 * change. Promotion is scoped and transient: `will-change` is set only while the
 * element is actually animating, and dropped on transition end, because a permanently
 * promoted layer costs memory for nothing.
 */
export function TextAntialiasingTransformsGood() {
  const [zoomed, setZoomed] = useState(false);
  const [animating, setAnimating] = useState(false);

  const toggle = () => {
    setAnimating(true);
    setZoomed((z) => !z);
  };

  return (
    <div className="w-full max-w-sm space-y-3">
      <button
        type="button"
        onClick={toggle}
        className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {zoomed ? 'Reset' : 'Zoom the text'}
      </button>

      <div className="flex h-40 items-center justify-center overflow-hidden rounded-xl border border-border bg-card p-4">
        {/* One transform on the wrapper; the text nodes are untouched */}
        <div
          onTransitionEnd={() => setAnimating(false)}
          className={`text-center transition-transform duration-500 motion-reduce:transition-none ${
            zoomed ? 'scale-150' : 'scale-100'
          } ${animating ? 'transform-gpu will-change-transform' : ''}`}
        >
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Revenue</p>
          <p className="text-2xl font-semibold text-foreground">$48,200</p>
          <p className="text-xs text-muted-foreground">vs. $43,000 last month</p>
        </div>
      </div>

      <p className="text-xs text-success">
        The whole lockup grows as one unit &mdash; spacing, alignment and proportion all hold. On a
        promoted layer the text is rasterized once and re-composited, so the strokes stay steady
        instead of crawling. The layer is created for the transition and released when it ends.
      </p>
    </div>
  );
}
