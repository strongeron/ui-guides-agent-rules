import { useState } from 'react';

export function IbelickReducedMotionBad() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Toggle Menu
        </button>
        <button
          onClick={() => setIsSpinning(!isSpinning)}
          className="px-4 py-2 bg-muted rounded-lg"
        >
          Toggle Spinner
        </button>
      </div>

      {/* BAD: Animation always plays regardless of prefers-reduced-motion */}
      {isOpen && (
        <div
          className="p-4 bg-muted rounded-lg"
          style={{
            // BAD: No motion-safe: prefix, no @media query check
            animation: 'bounceIn 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          }}
        >
          <p className="font-medium">Menu Content</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        </div>
      )}

      {/* BAD: Continuous spinning animation ignores reduced motion preference */}
      {isSpinning && (
        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
          <div
            className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
            style={{
              // BAD: Infinite animation without reduced-motion check
              animation: 'spin 1s linear infinite',
            }}
          />
          <span className="text-sm">Loading forever...</span>
        </div>
      )}

      <style>{`
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3) rotate(-10deg); }
          50% { transform: scale(1.1) rotate(5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        /* BAD: No @media (prefers-reduced-motion: reduce) check! */
      `}</style>
      <p className="text-xs text-destructive">
        Animations ignore prefers-reduced-motion - can trigger vestibular issues
      </p>
    </div>
  );
}
