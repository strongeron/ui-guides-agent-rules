import { useState } from 'react';
import { ReducedMotionSwitch } from '@/components/demo-kit/ReducedMotionSwitch';
import { useSimulatedReducedMotion } from '@/hooks/useSimulatedReducedMotion';

/**
 * Good: same 300ms, same curve, same layout. The only change is the hidden
 * offset — `translateY(calc(100% + 12px))`. A translate percentage resolves
 * against the element's *own* height, so 100% always clears the toast whatever
 * it currently contains; the 12px covers the gap to the bottom edge.
 */
export function PercentageTranslateGood() {
  const [shown, setShown] = useState(false);
  const [twoLines, setTwoLines] = useState(false);
  const reduced = useSimulatedReducedMotion();

  const motion = reduced
    ? {
        transition: 'opacity 150ms linear',
        transform: 'translateY(0)',
        opacity: shown ? 1 : 0,
      }
    : {
        transition: 'transform 300ms cubic-bezier(0.32, 0.72, 0, 1)',
        transform: shown ? 'translateY(0)' : 'translateY(calc(100% + 12px))',
        opacity: 1,
      };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setShown((v) => !v)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          {shown ? 'Hide toast' : 'Show toast'}
        </button>
        <label className="inline-flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
          <input
            type="checkbox"
            checked={twoLines}
            onChange={(e) => setTwoLines(e.target.checked)}
            className="size-3.5 accent-primary"
          />
          Grow to two lines
        </label>
        <ReducedMotionSwitch />
      </div>

      <div className="relative h-40 overflow-hidden rounded-lg bg-muted">
        <div
          className="absolute inset-x-3 bottom-3 rounded-md border border-border bg-card p-3 text-sm text-card-foreground"
          style={motion}
        >
          <p className="font-medium">Deployment queued</p>
          {twoLines && (
            <p className="mt-1 text-muted-foreground">
              Waiting on the build cache before it can start.
            </p>
          )}
        </div>
      </div>

      <p className="text-xs text-success">
        translateY(calc(100% + 12px)) is measured against the toast itself, so it hides cleanly at one line, two lines,
        or ten. Reduced motion swaps the slide for a fade.
      </p>
    </div>
  );
}
