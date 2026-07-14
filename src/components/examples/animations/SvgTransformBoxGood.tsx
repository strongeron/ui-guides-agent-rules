import { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Good: `transform-box: fill-box` re-points `transform-origin` at the group's
 * own bounding box, so `center` means the centre of the arrow. It spins in
 * place, wherever it happens to sit in the viewBox.
 */
export function SvgTransformBoxGood() {
  const [spun, setSpun] = useState(false);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <div className="w-full max-w-sm space-y-4">
      <button
        onClick={() => setSpun((v) => !v)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        Spin the arrow
      </button>

      <div className="rounded-lg bg-muted p-3">
        <svg viewBox="0 0 200 80" className="w-full h-20 text-primary" role="img" aria-label="Arrow rotating around its own centre">
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
              transformBox: 'fill-box',
              transformOrigin: 'center',
              transform: spun ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: reduced
                ? 'none'
                : 'transform 600ms cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            <polygon points="144,24 182,40 144,56" fill="currentColor" />
          </g>
        </svg>
      </div>

      <p className="text-xs text-success">
        transform-box: fill-box + transform-origin: center — the arrow spins in place. Reduced motion flips it instantly.
      </p>
    </div>
  );
}
