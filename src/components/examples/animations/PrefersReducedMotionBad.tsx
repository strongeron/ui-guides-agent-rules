import { useState } from 'react';

export function PrefersReducedMotionBad() {
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
        <div
          className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg animate-bounce"
        >
          <p className="text-sm text-gray-700">
            This card always bounces, even if you have motion sensitivity.
          </p>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-4">
        Animation ignores prefers-reduced-motion
      </p>
    </div>
  );
}
