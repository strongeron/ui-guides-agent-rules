import { useState } from 'react';

export function PrefersReducedMotionGood() {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <style>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .motion-safe-animate {
          animation: fadeInSlide 0.3s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .motion-safe-animate {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <button
        onClick={() => setShow(!show)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Toggle Card
      </button>

      {show && (
        <div
          className="motion-safe-animate mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          <p className="text-sm text-gray-700">
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
