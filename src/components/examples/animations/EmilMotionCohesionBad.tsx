import { useEffect, useRef, useState } from 'react';

// Three rows in the same analytics dashboard, each animated by whoever
// happened to build it. No shared vocabulary.
const ROWS = [
  { label: 'Requests', motion: 'transform 700ms cubic-bezier(0.34, 2.4, 0.5, 1), opacity 700ms ease' },
  { label: 'Errors', motion: 'transform 900ms linear, opacity 900ms linear' },
  { label: 'Latency', motion: 'transform 60ms ease-in, opacity 60ms ease-in' },
];

/**
 * Bad: a crisp, professional dashboard where one row bounces like a game, one
 * crawls linearly, and one snaps. Each may be defensible alone; together they
 * make the product feel assembled from parts.
 */
export function EmilMotionCohesionBad() {
  const [entered, setEntered] = useState(false);
  const frame = useRef(0);

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
        Replay dashboard
      </button>

      <div className="space-y-2 rounded-lg bg-muted p-3">
        {ROWS.map((row) => (
          <div
            key={row.label}
            className="rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground"
            style={{
              transition: entered ? row.motion : 'none',
              transform: entered ? 'translateX(0)' : 'translateX(-24px)',
              opacity: entered ? 1 : 0,
            }}
          >
            {row.label}
          </div>
        ))}
      </div>

      <p className="text-xs text-error">
        Three easings, three durations, three personalities in one dashboard — the motion has no author
      </p>
    </div>
  );
}
