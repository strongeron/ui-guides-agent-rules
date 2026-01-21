import { useState } from 'react';

export function IbelickReducedMotionGood() {
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
        <div className="p-4 bg-muted rounded-lg motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:duration-200">
          <p className="font-medium">Menu Content</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        </div>
      )}
      <p className="text-xs text-success">
        motion-safe: prefix only animates when user hasn't requested reduced motion
      </p>
    </div>
  );
}
