import { useState } from 'react';

export function IbelickNoLayoutGood() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        {open ? 'Collapse' : 'Expand'}
      </button>
      {/* Space is reserved so revealing the panel never animates layout. */}
      <div className="min-h-[120px]">
        <div
          className="rounded-lg bg-muted"
          style={{
            transform: open ? 'translateY(0)' : 'translateY(-8px)',
            opacity: open ? 1 : 0,
            transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 250ms ease-out',
            pointerEvents: open ? 'auto' : 'none',
          }}
        >
          <div className="p-3">
            <p className="font-medium">Panel Content</p>
            <p className="text-sm text-muted-foreground mt-2">Only transform and opacity animate, off the main thread.</p>
          </div>
        </div>
      </div>
      <p className="text-xs text-success">
        Reveal with <code>transform</code> + <code>opacity</code> — no layout recalculation, no distorted text
      </p>
    </div>
  );
}
