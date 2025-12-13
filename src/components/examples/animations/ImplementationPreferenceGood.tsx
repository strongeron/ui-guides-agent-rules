import { useState } from 'react';

export function ImplementationPreferenceGood() {
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    setIsAnimating(false);
    // Force reflow to restart animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    });
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <button
          onClick={startAnimation}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Animate
        </button>
        <div className="h-16 bg-gray-100 rounded-lg relative overflow-hidden">
          <div
            className={`absolute top-1/2 w-12 h-12 bg-blue-600 rounded-lg ${
              isAnimating ? 'animate-slide-bounce' : ''
            }`}
            style={{
              left: '50%',
              transform: 'translateX(-50%) translateY(-50%)',
            }}
          />
        </div>
        <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-2">
          <code className="text-xs text-green-800 font-mono">
            CSS animation (GPU-accelerated)
          </code>
        </div>
        <style>{`
          @keyframes slide-bounce {
            0%, 100% { transform: translateX(-50%) translateY(-50%); }
            25% { transform: translateX(50%) translateY(-50%); }
            50% { transform: translateX(-50%) translateY(-50%); }
            75% { transform: translateX(-150%) translateY(-50%); }
          }
          .animate-slide-bounce {
            animation: slide-bounce 2s ease-in-out;
          }
        `}</style>
      </div>
      <p className="text-xs text-green-700 mt-4">
        CSS animation runs off main thread, smooth 60fps
      </p>
    </div>
  );
}
