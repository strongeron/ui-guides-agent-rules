import { useEffect, useRef, useState } from 'react';

/**
 * Bad: the panel slides IN from the right and OUT through the bottom.
 *
 * The enter tells the user "I live off the right edge"; the exit then throws it
 * somewhere else entirely. The spatial model the enter just built is destroyed by
 * the exit, and the next time they want it back they have no idea where to reach.
 */

const OFF_RIGHT = 'translate3d(110%, 0, 0)';
const OFF_BOTTOM = 'translate3d(0, 110%, 0)';

export function SymmetricExitPathBad() {
  const [open, setOpen] = useState(false);
  const [resting, setResting] = useState(OFF_RIGHT);
  const [animating, setAnimating] = useState(false);
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const openPanel = () => {
    // Remounted off the RIGHT edge with no transition, then slid in.
    setAnimating(false);
    setResting(OFF_RIGHT);
    raf.current = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimating(true);
        setOpen(true);
      })
    );
  };

  const closePanel = () => {
    // ...and dismissed DOWNWARD. Different axis, different edge, no relationship
    // to the way it arrived.
    setAnimating(true);
    setResting(OFF_BOTTOM);
    setOpen(false);
  };

  return (
    <div className="w-full max-w-sm space-y-3">
      <button
        onClick={open ? closePanel : openPanel}
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
            transform: open ? 'translate3d(0, 0, 0)' : resting,
            transition: animating ? 'transform 320ms ease-out' : 'none',
          }}
        >
          <p className="font-medium">Details</p>
          <p className="mt-1 text-xs text-muted-foreground">
            In from the right, out through the floor.
          </p>
        </div>
      </div>

      <p className="text-xs text-destructive">
        Enter travels along X, exit travels along Y. The panel does not go back where it came
        from, so the user loses track of where it went.
      </p>
    </div>
  );
}
