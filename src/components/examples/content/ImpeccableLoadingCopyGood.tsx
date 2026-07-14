import { useEffect, useState } from 'react';

const TOTAL_ROWS = 1240;
const EXPECTED = 'this usually takes about a minute';

export function ImpeccableLoadingCopyGood() {
  const [rows, setRows] = useState(0);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (cancelled) return;
    const id = window.setInterval(() => {
      setRows((r) => (r >= TOTAL_ROWS ? 0 : Math.min(TOTAL_ROWS, r + 40)));
    }, 500);
    return () => window.clearInterval(id);
  }, [cancelled]);

  const percent = Math.round((rows / TOTAL_ROWS) * 100);

  if (cancelled) {
    return (
      <div className="w-full max-w-md space-y-3">
        <div className="space-y-2 rounded-lg border border-border bg-card p-6">
          <p className="text-sm font-medium text-foreground">Import cancelled</p>
          <p className="text-sm text-muted-foreground">
            {rows.toLocaleString()} of {TOTAL_ROWS.toLocaleString()} rows were
            imported. Nothing else changed.
          </p>
          <button
            type="button"
            onClick={() => {
              setRows(0);
              setCancelled(false);
            }}
            className="mt-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Start import again
          </button>
        </div>
        <p className="text-xs text-success">
          The escape hatch is real, and it says what it left behind.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-3">
      <div className="space-y-3 rounded-lg border border-border bg-card p-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground" aria-live="polite">
            Importing {TOTAL_ROWS.toLocaleString()} rows… {EXPECTED}
          </p>
          <p className="font-mono text-xs tabular-nums text-muted-foreground">
            {rows.toLocaleString()} / {TOTAL_ROWS.toLocaleString()} rows
          </p>
        </div>

        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Import progress"
          className="h-2 w-full overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${percent}%` }}
          />
        </div>

        <button
          type="button"
          onClick={() => setCancelled(true)}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Cancel import
        </button>
      </div>

      <p className="text-xs text-success">
        The copy names the work (“Importing 1,240 rows”), sets the expectation
        (“about a minute”), and proves it is alive via the row count — so a slow
        job never reads as a hang.
      </p>
    </div>
  );
}
