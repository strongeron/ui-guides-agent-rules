import { useState } from 'react';

export function CorrectTransformOriginBad() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Open Menu
      </button>
      {isOpen && (
        <div className="animate-scale-in mt-2 bg-card border border-border rounded-lg shadow-lg p-2 space-y-1 origin-center">
          <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Edit
          </button>
          <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Delete
          </button>
        </div>
      )}
      <p className="text-xs text-error mt-4">
        Menu scales from center, disconnected from the button
      </p>
    </div>
  );
}
