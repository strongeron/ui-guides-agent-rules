import { useEffect, useRef, useState } from 'react';

/**
 * Bad: two ways to break physicality.
 *
 * Left popover enters from `scale(0)` — it materializes from a single point,
 * which nothing in the real world does. Right popover has no transform at all:
 * a pure opacity fade, so it has no origin, no direction, no body.
 */
export function EmilNoScaleZeroBad() {
  const [open, setOpen] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    frame.current = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const replay = () => {
    setOpen(false);
    frame.current = requestAnimationFrame(() =>
      requestAnimationFrame(() => setOpen(true))
    );
  };

  return (
    <div className="w-full space-y-4">
      <button
        onClick={replay}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Replay
      </button>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-muted p-3">
          <p className="text-[11px] text-muted-foreground mb-2">scale(0)</p>
          <div
            className="rounded-md border border-border bg-card p-3 text-sm text-card-foreground"
            style={{
              transformOrigin: 'top left',
              transition: open
                ? 'transform 220ms cubic-bezier(0.23, 1, 0.32, 1), opacity 220ms cubic-bezier(0.23, 1, 0.32, 1)'
                : 'none',
              transform: open ? 'scale(1)' : 'scale(0)',
              opacity: open ? 1 : 0,
            }}
          >
            Copy link
          </div>
        </div>

        <div className="rounded-lg bg-muted p-3">
          <p className="text-[11px] text-muted-foreground mb-2">opacity only</p>
          <div
            className="rounded-md border border-border bg-card p-3 text-sm text-card-foreground"
            style={{
              transition: open ? 'opacity 220ms cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
              opacity: open ? 1 : 0,
            }}
          >
            Copy link
          </div>
        </div>
      </div>

      <p className="text-xs text-destructive">
        Left grows out of a single point (nothing appears from nothing). Right has no transform at all, so it has no
        body — it just materializes.
      </p>
    </div>
  );
}
