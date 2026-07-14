import { useEffect, useRef, useState } from 'react';
import { ReducedMotionSwitch } from '@/components/demo-kit/ReducedMotionSwitch';
import { useSimulatedReducedMotion } from '@/hooks/useSimulatedReducedMotion';

const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';
const DURATION_MS = 220;

/**
 * The hero lands alone, then the rest arrive in waves of three. Because a card is
 * only in flight for 220ms, at most 3 of 9 (one third) are ever moving at once,
 * and the whole cascade still finishes inside the 500ms stagger budget.
 */
const DELAYS_MS = [0, 200, 200, 200, 340, 340, 340, 480, 480];
const TOTAL_MS = Math.max(...DELAYS_MS) + DURATION_MS + 100;

const CARDS = ['Revenue', 'Signups', 'Churn', 'Latency', 'Errors', 'Uptime', 'Sessions', 'Retention', 'NPS'];

/**
 * Good: identical grid, identical per-card motion — only the concurrency changes.
 * The hero card lands first and becomes the anchor; the remaining cards enter in
 * waves so no more than a third of the grid is in active motion at any instant.
 */
export function LottieConcurrencyCapGood() {
  const [run, setRun] = useState(0);
  const [entered, setEntered] = useState(false);
  const [elapsed, setElapsed] = useState(TOTAL_MS);
  const peakRef = useRef(0);
  const [peak, setPeak] = useState(0);
  const reduced = useSimulatedReducedMotion();

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
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Replay reveal
        </button>
        <ReducedMotionSwitch />
      </div>

      {reduced ? (
        <p className="text-xs text-muted-foreground">
          Reduced motion: every card appears at once with no travel. Concurrency is a motion problem, so with the
          motion removed there is nothing left to cap.
        </p>
      ) : (
        <p className="text-xs tabular-nums text-muted-foreground">
          In motion now: <strong className="text-foreground">{inFlight}</strong>/9 · peak{' '}
          <strong className="text-success">{peak}</strong>/9
        </p>
      )}

      <div className="grid grid-cols-3 gap-2 rounded-lg border border-border bg-muted/40 p-3">
        {CARDS.map((label, i) => (
          <div
            key={label}
            className="rounded-md border border-border bg-card p-3 text-xs text-card-foreground"
            style={
              reduced
                ? { transition: 'opacity 150ms linear', transform: 'none', opacity: entered ? 1 : 0 }
                : {
                    transition: `transform ${DURATION_MS}ms ${EASE} ${DELAYS_MS[i]}ms, opacity ${DURATION_MS}ms ${EASE} ${DELAYS_MS[i]}ms`,
                    transform: entered ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.94)',
                    opacity: entered ? 1 : 0,
                  }
            }
          >
            {label}
          </div>
        ))}
      </div>

      <p className="text-xs text-success">
        Peak concurrency is 3 of 9. The hero lands alone and anchors the eye, then waves of three follow — and the
        last card still starts at 480ms, inside the 500ms stagger budget.
      </p>
    </div>
  );
}
