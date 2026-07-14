import { useEffect, useRef, useState } from 'react';
import { useSimulatedReducedMotion } from '@/hooks/useSimulatedReducedMotion';

/**
 * Good: in from the right, out to the right — the same path, reversed.
 *
 * The easings are mirrors of each other too. Enter uses cubic-bezier(0.16, 1, 0.3, 1);
 * the exit uses its inverse control points — (1 - x2, 1 - y2, 1 - x1, 1 - y1) —
 * i.e. cubic-bezier(0.7, 0, 0.84, 0), so the return retraces the outbound curve
 * rather than merely reversing the endpoints.
 */

const ENTER_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EXIT_EASE = 'cubic-bezier(0.7, 0, 0.84, 0)';
const OFF_RIGHT = 'translate3d(110%, 0, 0)';

export function SymmetricExitPathGood() {
  const [open, setOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const raf = useRef(0);
  const reduced = useSimulatedReducedMotion();

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const toggle = () => {
    setAnimating(true);
    raf.current = requestAnimationFrame(() => setOpen((v) => !v));
  };

  const transition = reduced
    ? 'opacity 150ms linear'
    : `transform 320ms ${open ? ENTER_EASE : EXIT_EASE}`;

  return (
    <div className="w-full max-w-sm space-y-3">
      <button
        onClick={toggle}
        className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        {open ? 'Dismiss panel' : 'Open panel'}
      </button>

      <div className="relative h-40 w-full overflow-hidden rounded-lg border border-border bg-muted">
        <div className="p-3 text-xs text-muted-foreground">Page content</div>

        <div
          aria-hidden={!open}
          className="absolute inset-y-0 right-0 w-40 border-l border-border bg-card p-3 text-sm text-card-foreground"
          style={{
            // Reduced motion: the travel is dropped, the crossfade still reports the
            // state change. It never exits along a path it did not enter on.
            transform: reduced ? 'none' : open ? 'translate3d(0, 0, 0)' : OFF_RIGHT,
            opacity: reduced && !open ? 0 : 1,
            transition: animating ? transition : 'none',
          }}
        >
          <p className="font-medium">Details</p>
          <p className="mt-1 text-xs text-muted-foreground">
            In from the right, out to the right.
          </p>
        </div>
      </div>

      <p className="text-xs text-success">
        {reduced
          ? 'Reduced motion: no travel at all — but the panel still never leaves by an edge it did not arrive from.'
          : 'Same axis, same edge, mirrored easing. The exit is the enter played backwards, so the panel stays where the user left it.'}
      </p>
    </div>
  );
}
