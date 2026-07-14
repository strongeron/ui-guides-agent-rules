import { useEffect, useRef, useState } from 'react';
import { ReducedMotionSwitch } from '@/components/demo-kit/ReducedMotionSwitch';
import { useSimulatedReducedMotion } from '@/hooks/useSimulatedReducedMotion';

/**
 * Good: identical duration (220ms) and easing to the bad panel. The only change
 * is the starting scale — 0.96 instead of 0 (and instead of no transform at all).
 * The popover was already "there", it just settles into place.
 */
export function EmilNoScaleZeroGood() {
  const [open, setOpen] = useState(false);
  const frame = useRef(0);
  const reduced = useSimulatedReducedMotion();

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

  const enter = reduced
    ? {
        transition: open ? 'opacity 150ms linear' : 'none',
        transform: 'none',
      }
    : {
        transition: open
          ? 'transform 220ms cubic-bezier(0.23, 1, 0.32, 1), opacity 220ms cubic-bezier(0.23, 1, 0.32, 1)'
          : 'none',
        transform: open ? 'scale(1)' : 'scale(0.96)',
      };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={replay}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Replay
        </button>
        <ReducedMotionSwitch />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-muted p-3">
          <p className="text-[11px] text-muted-foreground mb-2">scale(0.96) + opacity</p>
          <div
            className="rounded-md border border-border bg-card p-3 text-sm text-card-foreground"
            style={{ ...enter, transformOrigin: 'top left', opacity: open ? 1 : 0 }}
          >
            Copy link
          </div>
        </div>

        <div className="rounded-lg bg-muted p-3">
          <p className="text-[11px] text-muted-foreground mb-2">scale(0.96) + opacity</p>
          <div
            className="rounded-md border border-border bg-card p-3 text-sm text-card-foreground"
            style={{ ...enter, transformOrigin: 'top left', opacity: open ? 1 : 0 }}
          >
            Copy link
          </div>
        </div>
      </div>

      <p className="text-xs text-success">
        Same 220ms, same curve — only the starting scale changed. 0.96 reads as an object settling in, not one being
        born. Reduced motion drops the transform and keeps a plain fade.
      </p>
    </div>
  );
}
