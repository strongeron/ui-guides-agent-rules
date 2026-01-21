import { useState } from 'react';

export function IbelickNoBlurAnimationGood() {
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
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Static blur, animated opacity */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          />
          <div className="relative bg-background p-6 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-200">
            <p>Modal content</p>
            <button onClick={() => setIsOpen(false)} className="mt-4 text-sm underline">Close</button>
          </div>
        </div>
      )}
      <p className="text-xs text-success">
        Static blur with opacity fade - smooth 60fps animation
      </p>
    </div>
  );
}
