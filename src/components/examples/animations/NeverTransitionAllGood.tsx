import { useState } from 'react';

export function NeverTransitionAllGood() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`transition-transform-shadow p-4 bg-card border border-border rounded-lg cursor-pointer ${
          isHovered ? 'scale-105 shadow-xl' : 'scale-100 shadow-sm'
        }`}
      >
        <h3 className="font-semibold text-foreground">Hover Me</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Only specified properties animate
        </p>
      </div>

      <p className="text-xs text-success mt-4">
        Explicit transitions: transform, box-shadow
      </p>
    </div>
  );
}
