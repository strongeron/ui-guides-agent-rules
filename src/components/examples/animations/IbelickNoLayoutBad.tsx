import { useState } from 'react';

export function IbelickNoLayoutBad() {
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
        className="bg-muted rounded-lg overflow-hidden transition-all duration-300"
        style={{
          height: isExpanded ? '120px' : '48px',
          width: isExpanded ? '100%' : '200px',
        }}
      >
        <div className="p-3">
          <p className="font-medium">Panel Content</p>
          {isExpanded && <p className="text-sm text-muted-foreground mt-2">Additional details here...</p>}
        </div>
      </div>
      <p className="text-xs text-destructive">
        Animating width/height triggers layout recalculation every frame
      </p>
    </div>
  );
}
