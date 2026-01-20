import { useState } from 'react';

export function IbelickNoLayoutGood() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
      >
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      <div
        className="bg-muted rounded-lg overflow-hidden transition-transform duration-300 origin-top-left"
        style={{
          transform: isExpanded ? 'scale(1)' : 'scale(0.5, 0.4)',
        }}
      >
        <div className="p-3 w-full">
          <p className="font-medium">Panel Content</p>
          <p className="text-sm text-muted-foreground mt-2">Additional details here...</p>
        </div>
      </div>
      <p className="text-xs text-success">
        Using transform: scale() instead of width/height - no layout thrashing
      </p>
    </div>
  );
}
