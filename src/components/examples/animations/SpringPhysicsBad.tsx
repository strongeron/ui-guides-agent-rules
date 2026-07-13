import { useState } from 'react';

export function SpringPhysicsBad() {
  const [on, setOn] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setOn((v) => !v)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Toggle (spam me)
      </button>
      <div className="h-20 flex items-center">
        <div
          className="size-14 rounded-xl bg-primary"
          style={{ transform: on ? 'translateX(160px)' : 'translateX(0)', transition: 'transform 300ms ease' }}
        />
      </div>
      <p className="text-xs text-destructive">
        CSS <code>ease</code> — no momentum or overshoot; spam-clicking restarts it abruptly from a standstill each time
      </p>
    </div>
  );
}
