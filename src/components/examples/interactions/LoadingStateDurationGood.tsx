import { useEffect, useRef, useState } from 'react';

type Speed = 'fast' | 'slow';

const LATENCY: Record<Speed, number> = { fast: 60, slow: 1200 };
const SHOW_DELAY = 200; // don't show a spinner at all if we finish before this
const MIN_VISIBLE = 400; // once shown, keep it up at least this long

export function LoadingStateDurationGood() {
  const [speed, setSpeed] = useState<Speed>('fast');
  const [pending, setPending] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [log, setLog] = useState<{ latency: number; shown: number }[]>([]);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const run = () => {
    if (pending) return;
    setPending(true);

    const start = performance.now();
    let shownAt = 0;

    const showTimer = window.setTimeout(() => {
      shownAt = performance.now();
      setSpinner(true);
    }, SHOW_DELAY);
    timers.current.push(showTimer);

    const finish = () => {
      const latency = Math.round(performance.now() - start);
      window.clearTimeout(showTimer);

      // Never shown → land immediately. Already shown → hold it for MIN_VISIBLE.
      if (!shownAt) {
        setPending(false);
        setLog((prev) => [{ latency, shown: 0 }, ...prev].slice(0, 5));
        return;
      }
      const remaining = Math.max(0, MIN_VISIBLE - (performance.now() - shownAt));
      const holdTimer = window.setTimeout(() => {
        const shown = Math.round(performance.now() - shownAt);
        setSpinner(false);
        setPending(false);
        setLog((prev) => [{ latency, shown }, ...prev].slice(0, 5));
      }, remaining);
      timers.current.push(holdTimer);
    };

    const reqTimer = window.setTimeout(finish, LATENCY[speed]);
    timers.current.push(reqTimer);
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">Server:</span>
          {(['fast', 'slow'] as Speed[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpeed(s)}
              className={`rounded-md border border-border px-2 py-1 ${
                speed === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
              }`}
            >
              {s} ({LATENCY[s]}ms)
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={run}
          className="w-full rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
        >
          Load results
        </button>

        <div className="flex h-20 items-center justify-center rounded-md border border-border bg-muted">
          {spinner ? (
            <div
              aria-label="Loading"
              className="size-6 animate-spin rounded-full border-2 border-border border-t-primary"
            />
          ) : (
            <span className="text-xs text-muted-foreground">3 results</span>
          )}
        </div>

        <div className="space-y-1 text-xs tabular-nums">
          <div className="text-success">
            show-delay {SHOW_DELAY}ms · minimum visible {MIN_VISIBLE}ms
          </div>
          {log.map((l, i) => (
            <div key={i} className="text-muted-foreground">
              response {l.latency}ms →{' '}
              {l.shown === 0 ? 'no spinner at all' : `spinner visible ${l.shown}ms`}
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-success">
        The fast server never renders a spinner — the work finished before the {SHOW_DELAY}ms
        show-delay elapsed. The slow one shows a spinner that stays put for at least {MIN_VISIBLE}ms,
        so it reads as a state rather than a glitch. Hammer the button on &ldquo;fast&rdquo;: nothing
        strobes.
      </p>
    </div>
  );
}
