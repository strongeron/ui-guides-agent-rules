import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Good: the same modal, the same 400ms, the same 32px of travel — on
 * cubic-bezier(.22, 1, .36, 1) (ease-out-quart). Both y control points sit
 * inside the detector's [-0.1, 1.1] band, so the dialog decelerates into its
 * resting position and stops there, like a real object. The toast settles in
 * on the same curve instead of bouncing.
 *
 * Only the curve differs from the Bad example.
 */

/** The two curves plotted in the same unit box, so the overshoot is visible. */
function CurveStrip() {
  return (
    <div className="flex gap-4">
      {[
        {
          label: 'overshoot',
          d: 'M0,60 C40.8,93 16.2,-33 60,0',
          tone: 'text-error',
        },
        {
          label: 'ease-out-quart',
          d: 'M0,60 C13.2,0 21.6,0 60,0',
          tone: 'text-success',
        },
      ].map((curve) => (
        <div key={curve.label} className="flex flex-col items-center gap-1">
          <svg
            viewBox="-6 -40 72 140"
            className={`h-20 w-14 ${curve.tone}`}
            role="img"
            aria-label={`${curve.label} easing curve`}
          >
            {/* the 0–1 band: leaving it is the definition of overshoot */}
            <rect
              x="0"
              y="0"
              width="60"
              height="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 3"
              className="text-muted-foreground"
              opacity="0.5"
            />
            <path d={curve.d} fill="none" stroke="currentColor" strokeWidth="3" />
          </svg>
          <span className="text-[10px] text-muted-foreground">{curve.label}</span>
        </div>
      ))}
    </div>
  );
}

export function ImpeccableNoBounceEasingGood() {
  const [shown, setShown] = useState(false);
  const frame = useRef(0);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

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

  const enter = reduced
    ? 'none'
    : 'transform 400ms cubic-bezier(.22, 1, .36, 1), opacity 400ms linear';

  return (
    <div className="w-full max-w-sm space-y-4">
      <button
        onClick={replay}
        className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        Replay
      </button>

      <div className="relative h-44 overflow-hidden rounded-lg bg-muted p-4">
        <div
          className="rounded-lg border border-border bg-card p-4 shadow-lg"
          style={{
            transition: shown ? enter : 'none',
            transform: shown || reduced ? 'translateY(0)' : 'translateY(32px)',
            opacity: shown ? 1 : 0,
          }}
        >
          <h4 className="text-sm font-semibold text-foreground">Delete workspace?</h4>
          <p className="mt-1 text-xs text-muted-foreground">This cannot be undone.</p>
        </div>

        {/* Toast settles on the same curve — no loop, no bounce */}
        <div
          className="absolute bottom-4 left-4 right-4 rounded-md border border-border bg-card px-3 py-2 text-xs text-foreground shadow-md"
          style={{
            transition: shown ? enter : 'none',
            transform: shown || reduced ? 'translateY(0)' : 'translateY(32px)',
            opacity: shown ? 1 : 0,
          }}
        >
          Saved
        </div>
      </div>

      <CurveStrip />

      <p className="text-xs text-success">
        <code>cubic-bezier(.22, 1, .36, 1)</code> &mdash; same 400ms, same 32px, both y points
        inside [-0.1, 1.1]. It sprints and decelerates into place instead of springing past it.
        Reduced motion gets an instant appearance.
      </p>
    </div>
  );
}
