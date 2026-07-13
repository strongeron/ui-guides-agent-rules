import { useState } from 'react';

export function IbelickMotionLibraryBad() {
  const [x, setX] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setX((v) => (v ? 0 : 150))}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Toggle
        </button>
        <button
          onClick={() => setX(Math.random() * 150)}
          className="px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-sm"
        >
          Random (interrupt!)
        </button>
      </div>
      <div className="h-16 bg-muted/50 rounded-lg relative overflow-hidden">
        <div
          className="absolute top-2 size-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xs font-medium"
          // BAD: fixed-duration CSS transition, no velocity awareness
          style={{ transform: `translateX(${x}px)`, transition: 'transform 500ms ease' }}
        >
          CSS
        </div>
      </div>
      <p className="text-xs text-destructive">
        Click "Random" rapidly — a fixed 500ms CSS ease lags behind and re-eases from a standstill instead of responding to velocity
      </p>
    </div>
  );
}
