import { useState } from 'react';

export function CompositorFriendlyGood() {
  const [big, setBig] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setBig((v) => !v)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Toggle size
      </button>
      <div className="grid place-items-center h-40">
        <div
          className="w-16 h-16 rounded-xl bg-primary"
          style={{
            transform: big ? 'scale(2)' : 'scale(1)',
            transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
      <p className="text-xs text-success">
        The same growth via <code>transform: scale</code> runs on the compositor — smooth 60fps, no reflow
      </p>
    </div>
  );
}
