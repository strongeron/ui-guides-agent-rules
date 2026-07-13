import { useState } from 'react';

export function CompositorFriendlyBad() {
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
          className="rounded-xl bg-primary"
          style={{
            width: big ? 128 : 64,
            height: big ? 128 : 64,
            transition: 'width 400ms ease, height 400ms ease',
          }}
        />
      </div>
      <p className="text-xs text-destructive">
        Growing with <code>width</code>/<code>height</code> runs a layout pass on the main thread every frame
      </p>
    </div>
  );
}
