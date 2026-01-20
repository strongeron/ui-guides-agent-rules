import { useState } from 'react';

export function IbelickTimingBad() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-colors duration-700 ease-in hover:bg-primary/90"
      >
        Toggle Panel
      </button>
      {isVisible && (
        <div
          className="p-4 bg-muted rounded-lg"
          style={{
            animation: 'slowLinearIn 800ms linear',
          }}
        >
          <p>Panel content with slow linear animation</p>
        </div>
      )}
      <style>{`
        @keyframes slowLinearIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <p className="text-xs text-destructive">
        800ms linear animation feels sluggish and robotic
      </p>
    </div>
  );
}
