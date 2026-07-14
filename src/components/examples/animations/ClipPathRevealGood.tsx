import { useEffect, useRef, useState } from 'react';
import { ReducedMotionSwitch } from '@/components/demo-kit/ReducedMotionSwitch';
import { useSimulatedReducedMotion } from '@/hooks/useSimulatedReducedMotion';

/**
 * Good: the same 700ms bottom-up reveal, driven by `clip-path: inset()`.
 *
 * `inset(0 0 100% 0)` means "eat 100% in from the bottom" — the element is fully
 * clipped away but still occupies its box. Animating to `inset(0 0 0 0)` wipes it
 * open without ever touching layout, so nothing below it moves.
 */
export function ClipPathRevealGood() {
  const [revealed, setRevealed] = useState(false);
  const frame = useRef(0);
  const reduced = useSimulatedReducedMotion();

  useEffect(() => {
    frame.current = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const replay = () => {
    setRevealed(false);
    frame.current = requestAnimationFrame(() =>
      requestAnimationFrame(() => setRevealed(true))
    );
  };

  const reveal = reduced
    ? {
        clipPath: 'inset(0 0 0 0)',
        transition: revealed ? 'opacity 150ms linear' : 'none',
        opacity: revealed ? 1 : 0,
      }
    : {
        transition: revealed ? 'clip-path 700ms cubic-bezier(0.77, 0, 0.175, 1)' : 'none',
        clipPath: revealed ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
        opacity: 1,
      };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={replay}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Replay reveal
        </button>
        <ReducedMotionSwitch />
      </div>

      <div className="rounded-lg bg-muted p-3">
        <div style={reveal}>
          <div className="rounded-md border border-border bg-card p-3 text-sm text-card-foreground">
            <p className="font-medium">Deployment summary</p>
            <p className="text-muted-foreground mt-1">
              12 files changed across 3 packages. Build finished in 41s.
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          ↑ this line never moves — the box was always its full size
        </p>
      </div>

      <p className="text-xs text-success">
        inset(0 0 100% 0) → inset(0 0 0 0): the clip eats in from the bottom, so the card wipes open in place. Zero
        layout work, zero shift. Reduced motion skips the wipe and fades.
      </p>
    </div>
  );
}
