import { useState } from 'react';

/**
 * Bad: the transform is applied to the text nodes themselves. Press "Zoom" and each
 * glyph run is re-rasterized at a fractional size mid-transform, so the strokes visibly
 * shimmer and thicken. And because every text node scales about its *own* centre, the
 * lockup geometry comes apart — the heading, the figure and the caption drift out of
 * their relationship instead of growing as one object.
 */
export function TextAntialiasingTransformsBad() {
  const [zoomed, setZoomed] = useState(false);
  const scale = zoomed ? 'scale-150' : 'scale-100';

  return (
    <div className="w-full max-w-sm space-y-3">
      <button
        type="button"
        onClick={() => setZoomed((z) => !z)}
        className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {zoomed ? 'Reset' : 'Zoom the text'}
      </button>

      <div className="flex h-40 items-center justify-center overflow-hidden rounded-xl border border-border bg-card p-4">
        <div className="text-center">
          {/* Every text node carries its own transform */}
          <p
            className={`text-xs uppercase tracking-wide text-muted-foreground transition-transform duration-500 motion-reduce:transition-none ${scale}`}
          >
            Revenue
          </p>
          <p
            className={`text-2xl font-semibold text-foreground transition-transform duration-500 motion-reduce:transition-none ${scale}`}
          >
            $48,200
          </p>
          <p
            className={`text-xs text-muted-foreground transition-transform duration-500 motion-reduce:transition-none ${scale}`}
          >
            vs. $43,000 last month
          </p>
        </div>
      </div>

      <p className="text-xs text-error">
        Scaling a text node changes its smoothing: the browser re-rasterizes the glyphs at every
        intermediate size, and the strokes crawl. The composition breaks too &mdash; three separate
        transforms, three separate origins, so the lines overlap and the lockup stops being a lockup.
      </p>
    </div>
  );
}
