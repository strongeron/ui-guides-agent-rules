import { useEffect, useRef, useState } from 'react';

const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';
const DURATION_MS = 220;

/** Every card starts at the same instant. Nine things move; nothing is the anchor. */
const DELAYS_MS = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const TOTAL_MS = Math.max(...DELAYS_MS) + DURATION_MS + 100;

const CARDS = ['Revenue', 'Signups', 'Churn', 'Latency', 'Errors', 'Uptime', 'Sessions', 'Retention', 'NPS'];

/**
 * Bad: all nine cards scale, fade and slide on mount. At the peak, 9 of 9 elements
 * are in active motion — the eye has nothing to hold on to, so the grid reads as a
 * burst of noise that then resolves, rather than as a reveal you can follow.
 */
export function LottieConcurrencyCapBad() {
  const [run, setRun] = useState(0);
  const [entered, setEntered] = useState(false);
  const [elapsed, setElapsed] = useState(TOTAL_MS);
  const peakRef = useRef(0);
  const [peak, setPeak] = useState(0);

  useEffect(() => {
    setEntered(false);
    setElapsed(0);
    peakRef.current = 0;
    setPeak(0);

    let inner = 0;
    let raf = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        setEntered(true);
        const start = performance.now();
        const tick = () => {
          const t = performance.now() - start;
          setElapsed(t);
          const flying = DELAYS_MS.filter((d) => t >= d && t < d + DURATION_MS).length;
          if (flying > peakRef.current) {
            peakRef.current = flying;
            setPeak(flying);
          }
          if (t < TOTAL_MS) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      });
    });

    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
      cancelAnimationFrame(raf);
    };
  }, [run]);

  const inFlight = entered ? DELAYS_MS.filter((d) => elapsed >= d && elapsed < d + DURATION_MS).length : 0;

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setRun((r) => r + 1)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Replay reveal
        </button>
        <span className="text-xs tabular-nums text-muted-foreground">
          In motion now: <strong className="text-foreground">{inFlight}</strong>/9 · peak{' '}
          <strong className="text-destructive">{peak}</strong>/9
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-lg border border-border bg-muted/40 p-3">
        {CARDS.map((label, i) => (
          <div
            key={label}
            className="rounded-md border border-border bg-card p-3 text-xs text-card-foreground"
            style={{
              transition: `transform ${DURATION_MS}ms ${EASE} ${DELAYS_MS[i]}ms, opacity ${DURATION_MS}ms ${EASE} ${DELAYS_MS[i]}ms`,
              transform: entered ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.94)',
              opacity: entered ? 1 : 0,
            }}
          >
            {label}
          </div>
        ))}
      </div>

      <p className="text-xs text-destructive">
        Peak concurrency is 9 of 9. With three or more elements, keeping more than a third of them in flight at once
        gives the eye no anchor — the reveal is perceived as noise settling, not as an entrance.
      </p>
    </div>
  );
}
