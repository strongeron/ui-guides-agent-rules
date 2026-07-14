import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const ROWS = ['Requests', 'Errors', 'Latency'];

// One motion token for the whole surface. A monitoring dashboard's personality
// is "crisp and out of the way", so: short, ease-out, no bounce.
const DASHBOARD_MOTION =
  'transform 180ms cubic-bezier(0.23, 1, 0.32, 1), opacity 180ms cubic-bezier(0.23, 1, 0.32, 1)';

/**
 * Good: every row speaks the same motion language, and that language matches
 * what this product is. A playful consumer app would legitimately pick a
 * bouncier, slower token — cohesion is about matching the personality, not
 * about one universally correct curve.
 */
export function EmilMotionCohesionGood() {
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
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Replay dashboard
      </button>

      <div className="space-y-2 rounded-lg bg-muted p-3">
        {ROWS.map((label, i) => (
          <div
            key={label}
            className="rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground"
            style={{
              transition: entered
                ? reduced
                  ? 'opacity 150ms linear'
                  : DASHBOARD_MOTION
                : 'none',
              transitionDelay: entered && !reduced ? `${i * 40}ms` : '0ms',
              transform: reduced ? 'none' : entered ? 'translateX(0)' : 'translateX(-24px)',
              opacity: entered ? 1 : 0,
            }}
          >
            {label}
          </div>
        ))}
      </div>

      <p className="text-xs text-success">
        One shared token (180ms, ease-out, no bounce) — crisp, like the product it belongs to
      </p>
    </div>
  );
}
