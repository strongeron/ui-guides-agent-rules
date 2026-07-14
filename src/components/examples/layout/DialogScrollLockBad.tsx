import { useState } from 'react';

/**
 * BAD: the one-liner scroll lock — `overflow: hidden` on the scroll container.
 * Hiding overflow removes the scrollbar track, the content box gets ~12px wider, and
 * everything behind the scrim lurches sideways at the exact moment the dialog appears.
 * Then it lurches back on close.
 */
export function DialogScrollLockBad() {
  const [open, setOpen] = useState(false);

  const button =
    'rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring';

  return (
    <div className="space-y-3">
      <style>{`
        /* A classic (space-taking) scrollbar, so the shift is visible on every platform. */
        .dsl-page-bad::-webkit-scrollbar { width: 12px; }
        .dsl-page-bad::-webkit-scrollbar-thumb { border-radius: 6px; background-color: currentColor; }
      `}</style>

      <div
        className="dsl-page-bad relative h-56 overflow-y-auto rounded-lg border border-border bg-muted text-muted-foreground"
        style={{ overflowY: open ? 'hidden' : 'auto' }}
      >
        <div className="space-y-3 p-4">
          <div className="mx-auto w-64 rounded-md border border-border bg-card p-3 text-center text-sm text-foreground">
            Centered card — watch me jump
          </div>
          <p className="text-xs">Scroll me. Then open the dialog and watch the card shift right.</p>
          <div className="h-72 rounded-md border border-border" />
          <button type="button" className={button} onClick={() => setOpen(true)}>
            Open dialog
          </button>
        </div>

        {open && (
          <div className="sticky bottom-4 mx-4 rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-foreground">The page behind me just moved 12px.</p>
            <button type="button" className={`${button} mt-2`} onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-destructive">
        Nothing scrolled, yet everything moved. The layout got wider because the scrollbar left, and the
        user reads that lurch as a bug even if they cannot name it.
      </p>
    </div>
  );
}
