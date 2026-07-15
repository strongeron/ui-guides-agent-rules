import { useState } from 'react';

export function ModalDimsAndRecedesBad() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full max-w-sm">
      <div className="relative overflow-hidden rounded-xl border border-border" style={{ height: 260 }}>
        {/* Background stays full-size and fully lit — no scrim, no recede. */}
        <div className="p-4">
          <div className="h-5 w-24 rounded bg-muted" />
          <div className="mt-3 space-y-2">
            <div className="h-3 w-full rounded bg-muted" />
            <div className="h-3 w-5/6 rounded bg-muted" />
            <div className="h-3 w-2/3 rounded bg-muted" />
          </div>
          <button
            onClick={() => setOpen(true)}
            className="mt-4 rounded-lg bg-primary px-3 py-1.5 text-xs text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Open dialog
          </button>
        </div>

        {/* Dialog just pops in on top with no scrim: it reads as one more panel, not a blocking task. */}
        <div
          className={`absolute inset-x-4 bottom-4 rounded-lg border border-border bg-card p-4 transition-all duration-300 ${
            open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
          }`}
        >
          <p className="text-sm font-medium text-foreground">Delete file?</p>
          <p className="mt-1 text-xs text-muted-foreground">This can’t be undone.</p>
          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className="rounded px-2 py-1 text-xs text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Cancel
            </button>
            <button
              onClick={() => setOpen(false)}
              className="rounded bg-destructive px-2 py-1 text-xs text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-destructive">
        No scrim, background unchanged: nothing signals the page is paused, so the dialog reads as just another panel.
      </p>
    </div>
  );
}
