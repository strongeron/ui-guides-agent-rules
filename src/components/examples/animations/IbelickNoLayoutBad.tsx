import { useState } from 'react';

export function IbelickNoLayoutBad() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        {open ? 'Collapse' : 'Expand'}
      </button>
      <div
        className="overflow-hidden rounded-lg bg-muted"
        style={{ height: open ? 120 : 0, transition: 'height 300ms ease' }}
      >
        <div className="p-3">
          <p className="font-medium">Panel Content</p>
          <p className="text-sm text-muted-foreground mt-2">The browser recalculates layout on every frame.</p>
        </div>
      </div>
      <p className="text-xs text-destructive">
        Animating <code>height</code> triggers a layout pass every frame — janky on complex pages
      </p>
    </div>
  );
}
