import { useState } from 'react';

export function PrefersReducedMotionGood() {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <button
        onClick={() => setShow(!show)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Toggle Card
      </button>

      {show && (
        <div className="motion-safe-fade-in-slide mt-4 p-4 bg-card border border-border rounded-lg shadow-lg">
          <p className="text-sm text-foreground">
            This card respects your motion preferences.
          </p>
        </div>
      )}

      <p className="text-xs text-green-700 mt-4">
        Respects prefers-reduced-motion setting
      </p>
    </div>
  );
}
