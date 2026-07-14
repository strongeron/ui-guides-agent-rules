import { useEffect, useState } from 'react';
import { ReducedMotionSwitch } from '@/components/demo-kit/ReducedMotionSwitch';
import { useSimulatedReducedMotion } from '@/hooks/useSimulatedReducedMotion';

const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';
const DURATION_MS = 200;
const ROW_COUNT = 30;

/**
 * The cascade is a budget, not a per-item constant. Pick the step you want, then
 * clamp the total: nothing may start later than MAX_TOTAL_MS after the first row.
 * A "micro cascade" over a long list means a small step and a hard ceiling.
 */
const STEP_MS = 24;
const MAX_TOTAL_MS = 400;
const delayFor = (i: number) => Math.min(i * STEP_MS, MAX_TOTAL_MS);

const LAST_DELAY_MS = delayFor(ROW_COUNT - 1);

/**
 * Good: identical rows, identical 200ms motion — the only change is that the
 * delay is clamped. Rows 1–17 cascade at 24ms apart, everything past that shares
 * the 400ms ceiling, so the list is fully settled well inside the 500ms budget.
 */
export function LottieStaggerBudgetGood() {
  const [run, setRun] = useState(0);
  const [entered, setEntered] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const reduced = useSimulatedReducedMotion();

  useEffect(() => {
    setEntered(false);
    setElapsed(0);

    let inner = 0;
    let raf = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        setEntered(true);
        const start = performance.now();
        const tick = () => {
          const t = performance.now() - start;
          setElapsed(t);
          if (t < LAST_DELAY_MS + DURATION_MS) raf = requestAnimationFrame(tick);
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

  const settled = elapsed >= LAST_DELAY_MS + DURATION_MS;

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setRun((r) => r + 1)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Replay list
        </button>
        <ReducedMotionSwitch />
        {!reduced && (
          <span className="text-xs tabular-nums text-muted-foreground">
            {settled ? 'settled' : 'filling'} · {Math.round(Math.min(elapsed, LAST_DELAY_MS + DURATION_MS))}ms
          </span>
        )}
      </div>

      <ul className="h-56 space-y-1 overflow-y-auto rounded-lg border border-border bg-muted/40 p-2">
        {Array.from({ length: ROW_COUNT }, (_, i) => (
          <li
            key={i}
            className="rounded-md bg-card px-2 py-1.5 text-xs text-card-foreground"
            style={
              reduced
                ? { transition: 'opacity 150ms linear', transform: 'none', opacity: entered ? 1 : 0 }
                : {
                    transition: `transform ${DURATION_MS}ms ${EASE} ${delayFor(i)}ms, opacity ${DURATION_MS}ms ${EASE} ${delayFor(i)}ms`,
                    transform: entered ? 'translateY(0)' : 'translateY(6px)',
                    opacity: entered ? 1 : 0,
                  }
            }
          >
            Row {i + 1} <span className="text-muted-foreground">· starts at {delayFor(i)}ms</span>
          </li>
        ))}
      </ul>

      <p className="text-xs text-success">
        Clamped cascade: <code>Math.min(i * 24, 400)</code>. Row 30 starts at {LAST_DELAY_MS}ms instead of 1740ms, so
        the whole list settles inside the 500ms budget and no row arrives after the user has read it.
      </p>
    </div>
  );
}
