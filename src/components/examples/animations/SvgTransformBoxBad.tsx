import { useState } from 'react';

/**
 * Bad: a CSS transform on an SVG group with no `transform-box`. The default is
 * `view-box`, so `transform-origin: center` means the centre of the *viewBox*,
 * not the centre of the shape. The arrow orbits the canvas instead of spinning.
 */
export function SvgTransformBoxBad() {
  const [spun, setSpun] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4">
      <button
        onClick={() => setSpun((v) => !v)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Spin the arrow
      </button>

      <div className="rounded-lg bg-muted p-3">
        <svg viewBox="0 0 200 80" className="w-full h-20 text-primary" role="img" aria-label="Arrow rotating around the viewBox origin">
          <circle
            cx="160"
            cy="40"
            r="26"
            fill="none"
            stroke="currentColor"
            strokeDasharray="4 4"
            className="text-muted-foreground"
          />
          <g
            style={{
              // No transform-box: the origin is the viewBox centre (100, 40),
              // 60px away from the shape — so it swings right across the canvas.
              transformOrigin: 'center',
              transform: spun ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 600ms cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            <polygon points="144,24 182,40 144,56" fill="currentColor" />
          </g>
        </svg>
      </div>

      <p className="text-xs text-error">
        The arrow flies out of its dashed home — the rotation pivots on the viewBox origin, not the shape
      </p>
    </div>
  );
}
