import { useEffect, useRef, useState } from 'react';

export function ImplementationPreferenceBad() {
  const [position, setPosition] = useState(0);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const progress = (timestamp - startTimeRef.current) / 2000;

    if (progress < 1) {
      setPosition(Math.sin(progress * Math.PI * 4) * 50 + 50);
      animationRef.current = requestAnimationFrame(animate);
    } else {
      startTimeRef.current = undefined;
      setPosition(50);
    }
  };

  const startAnimation = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    startTimeRef.current = undefined;
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <button
          onClick={startAnimation}
          className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          Animate
        </button>
        <div className="h-16 bg-muted rounded-lg relative">
          <div
            className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-primary rounded-lg"
            style={{ left: `${position}%`, transform: `translateX(-50%) translateY(-50%)` }}
          />
        </div>
        <div className="mt-3 bg-error/10 border border-error/20 rounded-lg p-2">
          <code className="text-xs text-error-foreground font-mono">
            requestAnimationFrame + setState
          </code>
        </div>
      </div>
      <p className="text-xs text-error mt-4">
        JS-driven animation blocks main thread, causes jank
      </p>
    </div>
  );
}
