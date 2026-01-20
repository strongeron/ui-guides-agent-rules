import { useState } from 'react';

export function IbelickTimingGood() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Toggle Panel
      </button>
      {isVisible && (
        <div
          className="p-4 bg-muted rounded-lg"
          style={{
            animation: 'quickEaseOut 200ms cubic-bezier(0, 0, 0.2, 1)',
          }}
        >
          <p>Panel content with snappy ease-out animation</p>
        </div>
      )}
      <style>{`
        @keyframes quickEaseOut {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <p className="text-xs text-success">
        200ms ease-out feels responsive and natural
      </p>
    </div>
  );
}
