import { useState } from 'react';

export function CorrectTransformOriginBad() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        {open ? 'Close menu' : 'Open menu'}
      </button>
      <div className="relative h-44">
        {open && (
          <div
            className="absolute left-0 top-0 w-44 rounded-lg bg-card border border-border shadow-lg p-2 space-y-1"
            style={{ transformOrigin: 'center', animation: 'originGrow 500ms cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {['Edit', 'Duplicate', 'Delete'].map((x) => (
              <div key={x} className="px-3 py-2 text-sm rounded hover:bg-muted">
                {x}
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        @keyframes originGrow {
          from { opacity: 0; transform: scale(0.4); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <p className="text-xs text-destructive">
        <code>transform-origin: center</code> — the menu balloons out of its own middle, floating free of the button
      </p>
    </div>
  );
}
