import { useState, useRef, useEffect } from 'react';

export function TooltipInteractiveContentGood() {
  const [hint, setHint] = useState(false);
  const [open, setOpen] = useState(false);
  const [clicks, setClicks] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Move focus into the popover when it opens, return it to the trigger on close.
  useEffect(() => {
    if (open) panelRef.current?.querySelector('button')?.focus();
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-8">
          The hover tooltip carries text only. The action lives in a click-triggered popover you can Tab into and
          close with Escape.
        </p>

        <div className="flex justify-center py-6 gap-3">
          {/* Hover tooltip: purely informational, nothing to click inside it. */}
          <span className="relative">
            <span
              onMouseEnter={() => setHint(true)}
              onMouseLeave={() => setHint(false)}
              tabIndex={0}
              onFocus={() => setHint(true)}
              onBlur={() => setHint(false)}
              aria-describedby={hint ? 'plan-hint' : undefined}
              className="inline-flex items-center px-2.5 py-1 rounded-md bg-muted text-sm text-foreground border border-border outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              Free plan
            </span>
            {hint && (
              <span
                id="plan-hint"
                role="tooltip"
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap px-2 py-1 rounded bg-popover text-popover-foreground border border-border text-xs"
              >
                2 seats left
              </span>
            )}
          </span>

          {/* Interactive content gets a real popover: focusable, dismissible, keyboard-reachable. */}
          <span className="relative">
            <button
              ref={triggerRef}
              aria-haspopup="dialog"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="px-2.5 py-1 rounded-md border border-border bg-card text-sm text-foreground outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              Details
            </button>
            {open && (
              <div
                ref={panelRef}
                role="dialog"
                aria-label="Plan details"
                onKeyDown={(e) => e.key === 'Escape' && close()}
                className="absolute top-full right-0 mt-2 w-52 p-3 rounded-md bg-popover text-popover-foreground border border-border text-xs shadow-md z-10"
              >
                <p className="mb-2">You have 2 seats left on the free plan.</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setClicks((c) => c + 1);
                      close();
                    }}
                    className="px-2 py-1 rounded bg-primary text-primary-foreground text-xs outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Upgrade
                  </button>
                  <button
                    onClick={close}
                    className="px-2 py-1 rounded bg-muted text-foreground text-xs outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </span>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          Times &ldquo;Upgrade&rdquo; was actually pressed: <strong className="text-foreground">{clicks}</strong>
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        The popover stays open while you move to it, is reachable by Tab, and closes on Escape
      </p>
    </div>
  );
}
