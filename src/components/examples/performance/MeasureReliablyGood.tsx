import { useState } from 'react';

/** The workload under test — identical in both examples. */
function workload() {
  let n = 0;
  for (let i = 0; i < 400_000; i++) n += Math.sqrt(i);
  return n;
}

export function MeasureReliablyGood() {
  const [runs, setRuns] = useState<number[]>([]);

  const measure = () => {
    const next: number[] = [];
    for (let i = 0; i < 5; i++) {
      const t0 = performance.now();
      workload();
      next.push(performance.now() - t0);
    }
    setRuns(next);
  };

  const spread = runs.length ? Math.max(...runs) - Math.min(...runs) : 0;

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <p className="text-xs text-muted-foreground">
          Profiling in a clean profile — extensions disabled
        </p>
        <button
          onClick={measure}
          className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Run benchmark ×5
        </button>

        {runs.length > 0 && (
          <div className="space-y-1 font-mono text-xs">
            {runs.map((r, i) => (
              <p key={i} className="text-muted-foreground">
                run {i + 1}: {r.toFixed(1)} ms
              </p>
            ))}
            <p className="text-success pt-1">spread: {spread.toFixed(1)} ms</p>
          </div>
        )}
      </div>
      <p className="text-xs text-success">
        Same workload, a much tighter spread. Now a change that moves the number
        is a change you actually made.
      </p>
    </div>
  );
}
