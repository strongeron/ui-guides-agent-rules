import { useState } from 'react';

export function TooltipInteractiveContentBad() {
  const [open, setOpen] = useState(false);
  const [clicks, setClicks] = useState(0);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-8">
          Hover the badge, then try to reach the &ldquo;Upgrade&rdquo; button inside the tooltip. Try Tab, too.
        </p>

        <div className="flex justify-center py-6">
          <div className="relative">
            <span
              onMouseEnter={() => setOpen(true)}
              // The tooltip is bound to the trigger's hover only. Moving the pointer
              // toward the button leaves the trigger, so the tooltip unmounts first.
              onMouseLeave={() => setOpen(false)}
              className="inline-flex items-center px-2.5 py-1 rounded-md bg-muted text-sm text-foreground border border-border"
            >
              Free plan
            </span>

            {open && (
              // role="tooltip" content is never in the tab order, and it only exists while hovered.
              <div
                role="tooltip"
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 p-3 rounded-md bg-popover text-popover-foreground border border-border text-xs shadow-md"
              >
                <p className="mb-2">You have 2 seats left on the free plan.</p>
                <button
                  onClick={() => setClicks((c) => c + 1)}
                  className="px-2 py-1 rounded bg-primary text-primary-foreground text-xs"
                >
                  Upgrade
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          Times &ldquo;Upgrade&rdquo; was actually pressed: <strong className="text-foreground">{clicks}</strong>
        </p>
      </div>
      <p className="text-xs text-error mt-4">
        The button dies with the hover and is never in the tab order — keyboard users cannot reach it at all
      </p>
    </div>
  );
}
