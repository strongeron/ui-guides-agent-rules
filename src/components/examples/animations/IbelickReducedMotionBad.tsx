import { useState } from 'react';

export function IbelickReducedMotionBad() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
      >
        Toggle Menu
      </button>
      {isOpen && (
        <div
          className="p-4 bg-muted rounded-lg"
          style={{
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
      <style>{`
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3) rotate(-10deg); }
          50% { transform: scale(1.1) rotate(5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0); }
        }
      `}</style>
      <p className="text-xs text-destructive">
        Bouncy animation ignores prefers-reduced-motion - may cause discomfort
      </p>
    </div>
  );
}
