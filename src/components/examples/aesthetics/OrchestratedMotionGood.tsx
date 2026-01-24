import { useState, useEffect } from 'react';

export function OrchestratedMotionGood() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const items = ['Hero section loads first', 'Navigation fades in second', 'Content reveals third'];

  return (
    <div className="w-full max-w-md p-6 bg-card rounded-lg">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm mb-4"
      >
        Replay Sequence
      </button>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item}
            className="p-3 bg-muted rounded motion-safe:transition-all motion-safe:duration-500"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
            }}
          >
            {item}
          </div>
        ))}
      </div>

      <p className="text-xs text-success mt-4">
        Staggered reveal sequence with consistent animation-delay feels intentional
      </p>
    </div>
  );
}
