import { useState } from 'react';

export function IbelickNoBlurAnimationBad() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
      >
        Toggle Overlay
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            animation: 'blurIn 500ms ease-out forwards',
          }}
        >
          <div className="absolute inset-0 bg-black/50" style={{ backdropFilter: 'blur(var(--blur))' }} />
          <div className="relative bg-background p-6 rounded-lg shadow-lg">
            <p>Modal content</p>
            <button onClick={() => setIsOpen(false)} className="mt-4 text-sm underline">Close</button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes blurIn {
          from { --blur: 0px; }
          to { --blur: 8px; }
        }
      `}</style>
      <p className="text-xs text-destructive">
        Animating backdrop-filter causes severe jank on most devices
      </p>
    </div>
  );
}
