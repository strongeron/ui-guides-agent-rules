import { useEffect, useState } from 'react';

/**
 * BAD: two ways to get Escape wrong, both extremely common.
 * 1. The plain dialog has an X button and nothing else — Escape does nothing at all.
 * 2. The nested dialog and its popover each listen on `window` and neither stops
 *    propagation, so one Escape keypress dismisses BOTH layers. The user tried to
 *    close a dropdown and lost the whole dialog.
 */
export function EscapeDismissBad() {
  const [plainOpen, setPlainOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  // The dialog's own Escape listener, on window.
  useEffect(() => {
    if (!nestedOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNestedOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nestedOpen]);

  // The popover's Escape listener, also on window. Nothing coordinates the two.
  useEffect(() => {
    if (!popoverOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPopoverOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [popoverOpen]);

  const button =
    'rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring';

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button type="button" className={button} onClick={() => setPlainOpen(true)}>
          Open dialog (X only)
        </button>
        <button type="button" className={button} onClick={() => setNestedOpen(true)}>
          Open dialog with popover
        </button>
      </div>

      {plainOpen && (
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm text-foreground">
              Press Escape. Nothing happens — the only way out is the X.
            </p>
            <button
              type="button"
              aria-label="Close dialog"
              className={button}
              onClick={() => setPlainOpen(false)}
            >
              X
            </button>
          </div>
        </div>
      )}

      {nestedOpen && (
        <div className="space-y-3 rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-foreground">Open the popover, then press Escape once.</p>
          <button type="button" className={button} onClick={() => setPopoverOpen((v) => !v)}>
            Choose a plan
          </button>
          {popoverOpen && (
            <ul className="rounded-md border border-border bg-popover p-1">
              {['Hobby', 'Pro', 'Enterprise'].map((plan) => (
                <li key={plan}>
                  <button
                    type="button"
                    className="w-full rounded-sm px-2 py-1 text-left text-sm text-foreground hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {plan}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <p className="text-xs text-destructive">
        One keypress, two layers dismissed: both listeners are on `window`, so the same Escape event closes
        the popover and then the dialog underneath it.
      </p>
    </div>
  );
}
