import { useState } from 'react';

export function MotionTailwindConflictGood() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="space-y-4">
      <div
        // GOOD: No transition-* classes - let JS handle all animation
        className="p-4 bg-muted rounded-lg cursor-pointer"
        style={{
          // Motion handles transitions with its own spring physics
          transform: isHovered ? 'scale(1.05) translateY(-4px)' : 'scale(1)',
          opacity: isHovered ? 1 : 0.9,
          // Simulate Motion's spring transition
          transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s ease-out',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h4 className="font-medium text-sm">Hover me</h4>
        <p className="text-xs text-muted-foreground mt-1">
          No conflicting transition classes
        </p>
      </div>

      <p className="text-xs text-success">
        ✓ No Tailwind transition classes - Motion controls all animation smoothly
      </p>
    </div>
  );
}
