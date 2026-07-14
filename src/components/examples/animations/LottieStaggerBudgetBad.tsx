import { useEffect, useState } from 'react';

const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';
const DURATION_MS = 200;
const ROW_COUNT = 30;

/** A per-item delay with no cap. Reasonable on 5 rows; a disaster on 30. */
const STEP_MS = 60;
const delayFor = (i: number) => i * STEP_MS;

const LAST_DELAY_MS = delayFor(ROW_COUNT - 1);

/**
 * Bad: `animationDelay: i * 60ms` on a 30-row list. Row 30 does not begin moving
 * until 1740ms after row 1 — by which time the user has already scrolled past it,
 * and rows are visibly popping in underneath their own scroll position.
 */
export function LottieStaggerBudgetBad() {
  const [run, setRun] = useState(0);
  const [entered, setEntered] = useState(false);
  const [elapsed, setElapsed] = useState(0);

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
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Replay list
        </button>
        <span className="text-xs tabular-nums text-muted-foreground">
          {settled ? 'settled' : 'filling'} · {Math.round(Math.min(elapsed, LAST_DELAY_MS + DURATION_MS))}ms
        </span>
      </div>

      <ul className="h-56 space-y-1 overflow-y-auto rounded-lg border border-border bg-muted/40 p-2">
        {Array.from({ length: ROW_COUNT }, (_, i) => (
          <li
            key={i}
            className="rounded-md bg-card px-2 py-1.5 text-xs text-card-foreground"
            style={{
              transition: `transform ${DURATION_MS}ms ${EASE} ${delayFor(i)}ms, opacity ${DURATION_MS}ms ${EASE} ${delayFor(i)}ms`,
              transform: entered ? 'translateY(0)' : 'translateY(6px)',
              opacity: entered ? 1 : 0,
            }}
          >
            Row {i + 1} <span className="text-muted-foreground">· starts at {delayFor(i)}ms</span>
          </li>
        ))}
      </ul>

      <p className="text-xs text-destructive">
        Uncapped cascade: row 30 does not start until {LAST_DELAY_MS}ms. Scroll while it plays and you will watch rows
        pop in beneath you — the animation is still introducing content the user has already read.
      </p>
    </div>
  );
}
