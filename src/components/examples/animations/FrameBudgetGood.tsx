import { useState, useEffect } from 'react';

export function FrameBudgetGood() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      // GOOD: Only update React state, let React batch DOM writes
      // Using transform instead of margin for GPU acceleration
      setPosition((prev) => (prev + 2) % 200);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="space-y-4">
      <div className="h-16 bg-muted rounded-lg overflow-hidden relative">
        <div
          className="absolute top-2 left-0 w-12 h-12 bg-success rounded"
          style={{
            // GOOD: Using transform (compositor-only property)
            transform: `translateX(${position}px)`,
          }}
        />
      </div>
      <p className="text-xs text-success">
        ✓ Uses transform + requestAnimationFrame, stays within 16ms frame budget
      </p>
    </div>
  );
}
