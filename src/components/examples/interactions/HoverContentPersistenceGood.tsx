import { useEffect, useState } from 'react';

export function HoverContentPersistenceGood() {
  const [open, setOpen] = useState(false);

  // DISMISSIBLE: Escape closes the card without moving the pointer or focus.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [open]);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-sm text-foreground">
          Assigned to{' '}
          {/* The wrapper spans BOTH the trigger and the card, so the pointer never
              leaves it on the way over. HOVERABLE. */}
          <span
            className="relative inline-block"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              type="button"
              onFocus={() => setOpen(true)}
              className="font-medium text-primary underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              @dana
            </button>

            {open && (
              // pt-2 is an invisible bridge: the visual gap is still there, but it
              // is INSIDE the hoverable region, so crossing it never fires mouseleave.
              // No timer — the card persists until dismissed. PERSISTENT.
              <span className="absolute left-0 top-full z-10 block pt-2">
                <span className="block w-56 rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-md">
                  <span className="block font-medium">Dana Okafor</span>
                  <span className="mt-1 block text-muted-foreground">
                    Staff engineer · Platform
                  </span>
                  <button
                    type="button"
                    className="mt-2 block text-primary underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    View profile
                  </button>
                </span>
              </span>
            )}
          </span>{' '}
          for review.
        </p>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Hover <em>@dana</em> and walk your pointer down into the card — it stays, and{' '}
        <em>View profile</em> is clickable. Park on it as long as you like; nothing
        expires. Press Escape and it closes with the pointer exactly where it was, so a
        magnifier user who needs the card out of the way is not forced to lose their
        place.
      </p>

      <p className="mt-2 text-xs text-success">
        Hoverable, persistent, and dismissible — all three parts of WCAG 1.4.13
      </p>
    </div>
  );
}
