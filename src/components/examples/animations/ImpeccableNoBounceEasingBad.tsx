import { useEffect, useRef, useState } from 'react';

/**
 * Bad: the modal enters on cubic-bezier(.68, -.55, .27, 1.55). y1 = -0.55 and
 * y2 = 1.55 both fall outside the detector's [-0.1, 1.1] band, which is the
 * precise definition of overshoot: the element sails past its resting position
 * and springs back. The toast underneath uses Tailwind's `animate-bounce`.
 *
 * Duration (400ms) and distance (32px) are identical to the Good example —
 * only the curve differs.
 */
export function ImpeccableNoBounceEasingBad() {
  const [shown, setShown] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    frame.current = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const replay = () => {
    setShown(false);
    frame.current = requestAnimationFrame(() =>
      requestAnimationFrame(() => setShown(true))
    );
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <button
        onClick={replay}
        className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Replay
      </button>

      <div className="relative h-44 overflow-hidden rounded-lg bg-muted p-4">
        {/* Modal — overshooting curve */}
        <div
          className="rounded-lg border border-border bg-card p-4 shadow-lg"
          style={{
            transition: shown
              ? 'transform 400ms cubic-bezier(.68, -.55, .27, 1.55), opacity 400ms linear'
              : 'none',
            transform: shown ? 'translateY(0)' : 'translateY(32px)',
            opacity: shown ? 1 : 0,
          }}
        >
          <h4 className="text-sm font-semibold text-foreground">Delete workspace?</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            This cannot be undone.
          </p>
        </div>

        {/* Toast — animate-bounce, forever */}
        <div className="absolute bottom-4 left-4 right-4 animate-bounce rounded-md border border-border bg-card px-3 py-2 text-xs text-foreground shadow-md">
          Saved
        </div>
      </div>

      <p className="text-xs text-error">
        <code>cubic-bezier(.68, -.55, .27, 1.55)</code> &mdash; y1 and y2 escape the [-0.1, 1.1]
        band, so the dialog overshoots and springs back. The toast bounces on a loop. Nothing here
        has mass; the motion is claiming it does.
      </p>
    </div>
  );
}
