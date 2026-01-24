import { useState } from 'react';

export function OrchestratedMotionBad() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="w-full max-w-md p-6 bg-card rounded-lg">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm mb-4"
      >
        Toggle Elements
      </button>

      {isVisible && (
        <div className="space-y-3">
          <div
            className="p-3 bg-muted rounded animate-pulse"
          >
            Item 1 - Random pulse
          </div>
          <div
            className="p-3 bg-muted rounded animate-bounce"
          >
            Item 2 - Random bounce
          </div>
          <div
            className="p-3 bg-muted rounded animate-spin inline-block"
          >
            Item 3 - Random spin
          </div>
        </div>
      )}

      <p className="text-xs text-destructive mt-4">
        Scattered micro-interactions with no choreography feel chaotic
      </p>
    </div>
  );
}
