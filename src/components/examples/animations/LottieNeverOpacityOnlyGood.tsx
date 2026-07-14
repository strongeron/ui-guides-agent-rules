import { useEffect, useState } from 'react';
import { ReducedMotionSwitch } from '@/components/demo-kit/ReducedMotionSwitch';
import { useSimulatedReducedMotion } from '@/hooks/useSimulatedReducedMotion';

const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';
const RISE_PX = 6;

/**
 * Good: the same confirmation, now carried by opacity AND a 6px rise. Peripheral
 * vision is tuned to movement, so the pill registers even while the eye is still on
 * the button.
 *
 * Motion is the reinforcement channel, not the accessible one: the region is a
 * `role="status"` / `aria-live="polite"` live region regardless, and under reduced
 * motion the transform is dropped and the opacity change alone must — and does —
 * remain sufficient.
 */
export function LottieNeverOpacityOnlyGood() {
  const [saved, setSaved] = useState(false);
  const [clicks, setClicks] = useState(0);
  const reduced = useSimulatedReducedMotion();

  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 1800);
    return () => clearTimeout(t);
  }, [saved, clicks]);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs text-muted-foreground">Keep your eyes on the Save button.</p>
        <ReducedMotionSwitch />
      </div>

      <div className="relative flex h-40 items-end rounded-lg border border-border bg-muted/40 p-4">
        <span
          role="status"
          aria-live="polite"
          className="absolute right-4 top-4 rounded-full border border-border bg-card px-3 py-1 text-xs text-card-foreground"
          style={
            reduced
              ? { transition: 'opacity 150ms linear', transform: 'none', opacity: saved ? 1 : 0 }
              : {
                  transition: `transform 220ms ${EASE}, opacity 220ms ${EASE}`,
                  transform: saved ? 'translateY(0)' : `translateY(${RISE_PX}px)`,
                  opacity: saved ? 1 : 0,
                }
          }
        >
          {saved ? 'Saved' : ''}
        </span>

        <button
          onClick={() => {
            setClicks((c) => c + 1);
            setSaved(true);
          }}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Save
        </button>
        <span className="ml-3 text-xs tabular-nums text-muted-foreground">
          Save pressed <strong className="text-success">{clicks}×</strong>
        </span>
      </div>

      <p className="text-xs text-success">
        Fade plus a {RISE_PX}px rise: the movement is what your peripheral vision actually catches, so the confirmation
        registers without looking at it. The pill is still an <code>aria-live</code> region, and with reduced motion on
        the rise disappears while the announcement and the opacity change carry the state on their own.
      </p>
    </div>
  );
}
