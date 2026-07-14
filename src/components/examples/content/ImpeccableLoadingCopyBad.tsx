import { useEffect, useState } from 'react';

// The whole failure is the string. It never changes, and it never ends.
const LABEL = 'Loading…';

export function ImpeccableLoadingCopyBad() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setElapsed((s) => (s >= 90 ? 0 : s + 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const suspicious = elapsed >= 30;

  return (
    <div className="w-full max-w-md space-y-3">
      <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-8">
        <div
          className="size-6 animate-spin rounded-full border-2 border-border border-t-foreground motion-reduce:animate-none"
          aria-hidden="true"
        />
        <p className="text-sm text-foreground" aria-live="polite">
          {LABEL}
        </p>
        <p className="font-mono text-xs tabular-nums text-muted-foreground">
          {elapsed}s elapsed
        </p>
      </div>

      <p className="text-xs text-muted-foreground">
        No named work. No expected duration. No cancel. The copy says exactly the
        same thing at 1s and at 90s.
      </p>

      <p className="text-xs text-error">
        {suspicious
          ? `${elapsed}s in — is it working, or is it hung? The copy cannot tell you, so the user reloads and loses the job.`
          : 'Watch the counter: past ~30s the user has no way to tell "still working" from "stuck".'}
      </p>
    </div>
  );
}
