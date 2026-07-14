import { useEffect, useRef, useState } from 'react';

const LIMIT = 1_500_000;

// Same trial-division loop as the bad example — just not on the thread that renders.
const WORKER_SRC = `
self.onmessage = (e) => {
  const limit = e.data;
  let count = 0;
  for (let n = 2; n < limit; n++) {
    let prime = true;
    for (let d = 2; d * d <= n; d++) {
      if (n % d === 0) { prime = false; break; }
    }
    if (prime) count++;
  }
  self.postMessage(count);
};`;

export function OffloadMainThreadGood() {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ primes: number; ms: number; worst: number } | null>(null);
  const dialRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const worst = useRef(0);
  const started = useRef(0);

  useEffect(() => {
    const url = URL.createObjectURL(new Blob([WORKER_SRC], { type: 'text/javascript' }));
    const worker = new Worker(url);
    workerRef.current = worker;
    worker.onmessage = (e: MessageEvent<number>) => {
      setResult({
        primes: e.data,
        ms: Math.round(performance.now() - started.current),
        worst: Math.round(worst.current),
      });
      setBusy(false);
    };
    return () => {
      worker.terminate();
      URL.revokeObjectURL(url);
    };
  }, []);

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
    if (busy) return;
    worst.current = 0;
    started.current = performance.now();
    setBusy(true);
    workerRef.current?.postMessage(LIMIT);
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
          className="w-full rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground disabled:opacity-60"
          disabled={busy}
        >
          {busy ? 'Working in a Web Worker…' : `Count primes below ${LIMIT.toLocaleString('en-US')}`}
        </button>

        {result && (
          <div className="space-y-1 text-xs tabular-nums text-success">
            <div>
              {result.primes.toLocaleString('en-US')} primes in {result.ms} ms
            </div>
            <div>longest frame on the main thread: {result.worst} ms</div>
          </div>
        )}
      </div>
      <p className="text-xs text-success">
        Identical loop, posted to a Web Worker. The computation takes about as long as before, but it
        runs off the render thread: the needle keeps sweeping, the input keeps accepting keystrokes,
        and the longest main-thread frame stays a fraction of what the blocking version reports.
        Compare the two &ldquo;worst frame&rdquo; numbers on the same machine.
      </p>
    </div>
  );
}
