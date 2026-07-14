import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';

/**
 * GOOD: Escape closes exactly one layer — the topmost one — and closing the dialog
 * returns focus to the trigger that opened it.
 * The popover handles Escape first and calls stopPropagation(), so the event never
 * reaches the dialog beneath it.
 */
export function EscapeDismissGood() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [plan, setPlan] = useState('Hobby');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Initial focus inside the dialog when it opens.
  useEffect(() => {
    if (dialogOpen) dialogRef.current?.focus();
  }, [dialogOpen]);

  const closeDialog = () => {
    setPopoverOpen(false);
    setDialogOpen(false);
    triggerRef.current?.focus(); // restore focus to the trigger
  };

  // The dialog only sees Escape if no layer above it claimed the event.
  const onDialogKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') closeDialog();
  };

  const onPopoverKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Escape') return;
    e.stopPropagation(); // topmost layer wins: the dialog never hears this
    setPopoverOpen(false);
  };

  const button =
    'rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring';

  return (
    <div className="space-y-3">
      <button ref={triggerRef} type="button" className={button} onClick={() => setDialogOpen(true)}>
        Open dialog
      </button>

      {dialogOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Plan settings"
          tabIndex={-1}
          onKeyDown={onDialogKeyDown}
          className="space-y-3 rounded-lg border border-border bg-card p-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          <p className="text-sm text-foreground">
            Selected plan: <span className="font-medium">{plan}</span>
          </p>

          <div onKeyDown={onPopoverKeyDown}>
            <button
              type="button"
              className={button}
              aria-expanded={popoverOpen}
              onClick={() => setPopoverOpen((v) => !v)}
            >
              Choose a plan
            </button>
            {popoverOpen && (
              <ul className="mt-1 rounded-md border border-border bg-popover p-1">
                {['Hobby', 'Pro', 'Enterprise'].map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => {
                        setPlan(option);
                        setPopoverOpen(false);
                      }}
                      className="w-full rounded-sm px-2 py-1 text-left text-sm text-foreground hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button type="button" className={button} onClick={closeDialog}>
            Done
          </button>
        </div>
      )}

      <p className="text-xs text-success">
        First Escape closes the popover only. A second Escape closes the dialog and puts focus back on the
        button you opened it with. One keypress, one layer.
      </p>
    </div>
  );
}
