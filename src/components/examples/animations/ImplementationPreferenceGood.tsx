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
      <div className="bg-card border border-border rounded-lg p-4">
        <button
          onClick={startAnimation}
          className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          Animate
        </button>
        <div className="h-16 bg-muted rounded-lg relative overflow-hidden">
          <div
            className={`absolute top-1/2 w-12 h-12 bg-primary rounded-lg ${
              isAnimating ? 'animate-slide-bounce' : ''
            }`}
            style={{
              left: '50%',
              transform: 'translateX(-50%) translateY(-50%)',
            }}
          />
        </div>
        <div className="mt-3 bg-success/10 border border-success/20 rounded-lg p-2">
          <code className="text-xs text-success-foreground font-mono">
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
      <p className="text-xs text-success mt-4">
        CSS animation runs off main thread, smooth 60fps
      </p>
    </div>
  );
}
