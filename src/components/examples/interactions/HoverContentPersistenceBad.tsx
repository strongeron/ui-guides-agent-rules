import { useEffect, useRef, useState } from 'react';

export function HoverContentPersistenceBad() {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-sm text-foreground">
          Assigned to{' '}
          <span className="relative inline-block">
            <button
              type="button"
              onMouseEnter={() => {
                setOpen(true);
                // PERSISTENT violated: the card evaporates on a timer, whether or
                // not the user is done reading it.
                clearTimeout(timerRef.current);
                timerRef.current = setTimeout(() => setOpen(false), 3000);
              }}
              // HOVERABLE violated: leaving the trigger closes the card, and there
              // is a 8px gap of dead space to cross to reach it.
              onMouseLeave={() => setOpen(false)}
              className="font-medium text-primary underline underline-offset-2"
            >
              @dana
            </button>

            {open && (
              <span className="absolute left-0 top-full z-10 mt-2 block w-56 rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-md">
                <span className="block font-medium">Dana Okafor</span>
                <span className="mt-1 block text-muted-foreground">
                  Staff engineer · Platform
                </span>
                <span className="mt-2 block text-primary underline">
                  View profile
                </span>
              </span>
            )}
          </span>{' '}
          for review.
        </p>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Hover <em>@dana</em>. Now try to move your pointer into the card to read it or
        click <em>View profile</em> — crossing the gap fires <code>mouseleave</code>{' '}
        and the card is gone. Hold still instead and it still vanishes after 3s. Press
        Escape: nothing. At 400% zoom the card can overflow the screen and there is no
        way to dismiss it without moving the pointer.
      </p>

      <p className="mt-2 text-xs text-destructive">
        Not hoverable, not persistent, not dismissible — WCAG 1.4.13 fails on all three
      </p>
    </div>
  );
}
