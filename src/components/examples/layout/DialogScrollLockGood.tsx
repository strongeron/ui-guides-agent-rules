import { useState } from 'react';

/**
 * GOOD: `scrollbar-gutter: stable` reserves the scrollbar track permanently, so taking
 * the scrollbar away changes no geometry at all. The dialog's own scroll area adds
 * `overscroll-behavior: contain` so a flick inside it never chains out to the page.
 */
export function DialogScrollLockGood() {
  const [open, setOpen] = useState(false);

  const button =
    'rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring';

  return (
    <div className="space-y-3">
      <style>{`
        .dsl-page-good::-webkit-scrollbar { width: 12px; }
        .dsl-page-good::-webkit-scrollbar-thumb { border-radius: 6px; background-color: currentColor; }
        /* The gutter is reserved whether or not a scrollbar is currently drawn. */
        .dsl-page-good { scrollbar-gutter: stable; }
        .dsl-dialog-scroll { overscroll-behavior: contain; }
      `}</style>

      <div
        className="dsl-page-good relative h-56 overflow-y-auto rounded-lg border border-border bg-muted text-muted-foreground"
        style={{ overflowY: open ? 'hidden' : 'auto' }}
      >
        <div className="space-y-3 p-4">
          <div className="mx-auto w-64 rounded-md border border-border bg-card p-3 text-center text-sm text-foreground">
            Centered card — perfectly still
          </div>
          <p className="text-xs">Scroll me. Then open the dialog: nothing behind it moves.</p>
          <div className="h-72 rounded-md border border-border" />
          <button type="button" className={button} onClick={() => setOpen(true)}>
            Open dialog
          </button>
        </div>

        {open && (
          <div className="sticky bottom-4 mx-4 rounded-lg border border-border bg-card p-4">
            <div className="dsl-dialog-scroll max-h-20 overflow-y-auto text-sm text-foreground">
              <p>Scroll inside me and the page underneath stays put — overscroll-behavior: contain.</p>
              <p className="mt-2 text-xs text-muted-foreground">More dialog content…</p>
              <p className="mt-2 text-xs text-muted-foreground">…and a bit more.</p>
            </div>
            <button type="button" className={`${button} mt-2`} onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-success">
        Scrolling is locked and the layout is byte-for-byte identical: the gutter never left. On legacy
        targets, pad by `window.innerWidth - document.documentElement.clientWidth` for the same result.
      </p>
    </div>
  );
}
