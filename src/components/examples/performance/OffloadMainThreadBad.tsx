import { useEffect, useRef, useState } from 'react';

const LIMIT = 1_500_000;

function countPrimes(limit: number) {
  let count = 0;
  for (let n = 2; n < limit; n++) {
    let prime = true;
    for (let d = 2; d * d <= n; d++) {
      if (n % d === 0) {
        prime = false;
        break;
      }
    }
    if (prime) count++;
  }
  return count;
}

export function OffloadMainThreadBad() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<{ primes: number; ms: number; worst: number } | null>(null);
  const dialRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const worst = useRef(0);

  // A JS-driven ticker: it can only advance when the main thread is free.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last;
      last = t;
      if (dt > worst.current) worst.current = dt;
      if (dialRef.current) dialRef.current.style.transform = `rotate(${(t / 4) % 360}deg)`;
      if (frameRef.current) {
        frameRef.current.textContent = `frame: ${dt.toFixed(1)} ms · worst: ${worst.current.toFixed(0)} ms`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const run = () => {
    worst.current = 0;
    const t0 = performance.now();
    // Blocks the main thread: no frames, no keystrokes, no clicks until this returns.
    const primes = countPrimes(LIMIT);
    const ms = performance.now() - t0;
    setResult({ primes, ms: Math.round(ms), worst: 0 });
    window.setTimeout(
      () => setResult({ primes, ms: Math.round(ms), worst: Math.round(worst.current) }),
      300,
    );
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-full border border-border bg-muted">
            <div ref={dialRef} className="h-4 w-0.5 origin-bottom rounded-full bg-primary" />
          </div>
          <div ref={frameRef} className="text-xs tabular-nums text-muted-foreground">
            frame: — · worst: —
          </div>
        </div>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type here while it computes…"
          className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground"
        />

        <button
          type="button"
          onClick={run}
          className="w-full rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
        >
          Count primes below {LIMIT.toLocaleString('en-US')}
        </button>

        {result && (
          <div className="space-y-1 text-xs tabular-nums text-error">
            <div>
              {result.primes.toLocaleString('en-US')} primes in {result.ms} ms
            </div>
            <div>longest frozen frame: {result.worst || '…'} ms</div>
          </div>
        )}
      </div>
      <p className="text-xs text-error">
        Start typing, then hit the button. The needle stops dead, your keystrokes queue up, and the
        longest frame stretches to roughly the length of the whole computation — one task, one
        thread, everything else waits. That is a frozen tab, not a slow one.
      </p>
    </div>
  );
}
