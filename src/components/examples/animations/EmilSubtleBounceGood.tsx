import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Good: bounce kept in the 0.1–0.3 range — a single, barely-perceptible
 * overshoot that gives the popover weight without turning it into a toy.
 * Save real bounce for drag-to-dismiss and other playful, physical gestures.
 */
export function EmilSubtleBounceGood() {
  const [entered, setEntered] = useState(false);
  const frame = useRef(0);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    frame.current = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const replay = () => {
    setEntered(false);
    frame.current = requestAnimationFrame(() =>
      requestAnimationFrame(() => setEntered(true))
    );
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <button
        onClick={replay}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        Replay popover
      </button>

      <div className="h-28 rounded-lg bg-muted p-3 overflow-hidden">
        <div
          className="origin-top rounded-md border border-border bg-card p-3 text-sm text-card-foreground"
          style={{
            transition: reduced
              ? entered
                ? 'opacity 150ms linear'
                : 'none'
              : entered
                ? 'transform 320ms cubic-bezier(0.34, 1.28, 0.64, 1)'
                : 'none',
            transform: reduced
              ? 'none'
              : entered
                ? 'scale(1) translateY(0)'
                : 'scale(0.96) translateY(-8px)',
            opacity: entered ? 1 : 0,
          }}
        >
          Notification settings
        </div>
      </div>

      <p className="text-xs text-success">
        Bounce ~0.2 — one small overshoot, then it settles. Reduced motion drops it to a fade.
      </p>
    </div>
  );
}
