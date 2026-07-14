import { useRef, useState } from 'react';

type Speed = 'fast' | 'slow';

const LATENCY: Record<Speed, number> = { fast: 60, slow: 1200 };

export function LoadingStateDurationBad() {
  const [speed, setSpeed] = useState<Speed>('fast');
  const [pending, setPending] = useState(false);
  const [log, setLog] = useState<{ shown: number; flicker: boolean }[]>([]);
  const shownAt = useRef(0);

  const run = () => {
    if (pending) return;
    // Spinner mounts on the same tick the request starts, and unmounts the moment it lands.
    setPending(true);
    shownAt.current = performance.now();
    window.setTimeout(() => {
      const shown = Math.round(performance.now() - shownAt.current);
      setPending(false);
      setLog((prev) => [{ shown, flicker: shown < 300 }, ...prev].slice(0, 5));
    }, LATENCY[speed]);
  };

  const flickers = log.filter((l) => l.flicker).length;

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
          {pending ? (
            <div
              aria-label="Loading"
              className="size-6 animate-spin rounded-full border-2 border-border border-t-primary"
            />
          ) : (
            <span className="text-xs text-muted-foreground">3 results</span>
          )}
        </div>

        <div className="space-y-1 text-xs tabular-nums">
          <div className="text-error">
            Sub-300ms flashes: {flickers} / {log.length}
          </div>
          {log.map((l, i) => (
            <div key={i} className={l.flicker ? 'text-error' : 'text-muted-foreground'}>
              spinner visible for {l.shown}ms {l.flicker ? '← strobe' : ''}
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-error">
        No show-delay and no minimum visible time. On the fast server the spinner appears and
        vanishes inside ~60ms — click repeatedly and the panel strobes. The flash is pure noise: the
        response was already fast enough that nothing needed to be said.
      </p>
    </div>
  );
}
