import { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const TRAVEL = 200;

/**
 * Good: the knob is driven by a CSS transition. A transition interpolates from
 * the *current computed value*, so interrupting it retargets smoothly from
 * wherever the knob happens to be — no restart, no snap.
 */
export function EmilTransitionsOverKeyframesGood() {
  const [on, setOn] = useState(false);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <div className="w-full max-w-sm space-y-4">
      <button
        onClick={() => setOn((v) => !v)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        Toggle — now spam-click it
      </button>

      <div className="relative h-16 rounded-full bg-muted p-2 overflow-hidden">
        <div
          className="h-12 w-12 rounded-full bg-primary"
          style={{
            transition: reduced
              ? 'none'
              : 'transform 600ms cubic-bezier(0.23, 1, 0.32, 1)',
            transform: `translateX(${on ? TRAVEL : 0}px)`,
          }}
        />
      </div>

      <p className="text-xs text-success">
        Spam-click mid-motion: the transition retargets from the knob's current position. Reduced motion jumps instantly.
      </p>
    </div>
  );
}
