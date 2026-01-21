import { useState } from 'react';

export function MotionTailwindConflictBad() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="space-y-4">
      <div
        className={`
          p-4 bg-muted rounded-lg cursor-pointer
          transition-all duration-300 ease-in-out
        `}
        style={{
          // BAD: Framer Motion-style transform conflicting with Tailwind transition
          transform: isHovered ? 'scale(1.05) translateY(-4px)' : 'scale(1)',
          opacity: isHovered ? 1 : 0.9,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h4 className="font-medium text-sm">Hover me</h4>
        <p className="text-xs text-muted-foreground mt-1">
          transition-all class conflicts with JS animation
        </p>
      </div>

      <p className="text-xs text-destructive">
        ✗ Tailwind transition-all conflicts with Motion - causes stuttery animation
      </p>
    </div>
  );
}
