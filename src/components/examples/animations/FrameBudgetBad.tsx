import { useEffect, useRef } from 'react';

export function FrameBudgetBad() {
  const boxRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      positionRef.current = (positionRef.current + 2) % 200;

      // BAD: Layout thrashing - read then write in each frame
      if (boxRef.current) {
        // Force layout read (intentionally unused to demonstrate the problem)
        void boxRef.current.offsetWidth;
        // Immediately write (causes layout thrashing)
        boxRef.current.style.marginLeft = `${positionRef.current}px`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="space-y-4">
      <div className="h-16 bg-muted rounded-lg overflow-hidden relative">
        <div
          ref={boxRef}
          className="absolute top-2 w-12 h-12 bg-destructive rounded"
          // Position set via marginLeft in useEffect (causes layout thrashing)
        />
      </div>
      <p className="text-xs text-destructive">
        ✗ Layout thrashing: reads and writes DOM in each frame, exceeding 16ms budget
      </p>
    </div>
  );
}
