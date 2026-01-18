import { useState } from 'react';

export function CorrectTransformOriginGood() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Open Menu
      </button>
      {isOpen && (
        <div className="animate-scale-in-from-top mt-2 bg-card border border-border rounded-lg shadow-lg p-2 space-y-1 origin-top-left">
          <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            Edit
          </button>
          <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            Delete
          </button>
        </div>
      )}
      <p className="text-xs text-success mt-4">
        Menu scales from top-left, connected to the button
      </p>
    </div>
  );
}
