import { useState } from 'react';

/**
 * Bad: the toast is parked off-screen with a hardcoded `translateY(56px)` —
 * a number someone measured against the one-line toast that existed at the time.
 * Grow the content to two lines and the offset is 20px short: the toast peeks
 * above the bottom edge while it is supposed to be hidden.
 */
export function PercentageTranslateBad() {
  const [shown, setShown] = useState(false);
  const [twoLines, setTwoLines] = useState(false);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setShown((v) => !v)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {shown ? 'Hide toast' : 'Show toast'}
        </button>
        <label className="inline-flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
          <input
            type="checkbox"
            checked={twoLines}
            onChange={(e) => setTwoLines(e.target.checked)}
            className="size-3.5 accent-primary"
          />
          Grow to two lines
        </label>
      </div>

      <div className="relative h-40 overflow-hidden rounded-lg bg-muted">
        <div
          className="absolute inset-x-3 bottom-3 rounded-md border border-border bg-card p-3 text-sm text-card-foreground"
          style={{
            transition: 'transform 300ms cubic-bezier(0.32, 0.72, 0, 1)',
            transform: shown ? 'translateY(0)' : 'translateY(56px)',
          }}
        >
          <p className="font-medium">Deployment queued</p>
          {twoLines && (
            <p className="mt-1 text-muted-foreground">
              Waiting on the build cache before it can start.
            </p>
          )}
        </div>
      </div>

      <p className="text-xs text-destructive">
        56px was correct for exactly one toast height. At two lines the "hidden" toast still peeks 20px into view.
      </p>
    </div>
  );
}
