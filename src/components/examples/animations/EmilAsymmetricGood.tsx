import { useState } from 'react';

export function EmilAsymmetricGood() {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setShow((v) => !v)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        {show ? 'Dismiss' : 'Show toast'}
      </button>
      <div className="min-h-[3rem]">
        <div
          className="inline-block p-3 rounded-lg bg-muted text-sm"
          style={{
            // Deliberate entrance, snappy exit.
            transition: show
              ? 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)'
              : 'transform 120ms ease-out, opacity 120ms ease-out',
            transform: show ? 'translateY(0)' : 'translateY(8px)',
            opacity: show ? 1 : 0,
            pointerEvents: show ? 'auto' : 'none',
          }}
        >
          Saved to your library
        </div>
      </div>
      <p className="text-xs text-success">
        Enter is deliberate (300ms), exit snaps (120ms); the UI always feels responsive
      </p>
    </div>
  );
}
