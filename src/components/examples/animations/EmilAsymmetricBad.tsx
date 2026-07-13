import { useState } from 'react';

export function EmilAsymmetricBad() {
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
            transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)',
            transform: show ? 'translateY(0)' : 'translateY(8px)',
            opacity: show ? 1 : 0,
            pointerEvents: show ? 'auto' : 'none',
          }}
        >
          Saved to your library
        </div>
      </div>
      <p className="text-xs text-destructive">
        Enter and exit both take 500ms; dismissing feels sluggish
      </p>
    </div>
  );
}
