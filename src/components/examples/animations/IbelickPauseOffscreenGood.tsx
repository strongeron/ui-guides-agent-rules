import { useState, useEffect, useRef } from 'react';

export function IbelickPauseOffscreenGood() {
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-4" ref={ref}>
      <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
        <div
          className="size-8 border-4 border-primary border-t-transparent rounded-full"
          style={{
            animation: 'spin 1s linear infinite',
            animationPlayState: isVisible ? 'running' : 'paused',
          }}
        />
        <span className="text-sm">Loading data... {isVisible ? '(visible)' : '(paused)'}</span>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <p className="text-xs text-success">
        IntersectionObserver pauses animation when off screen
      </p>
    </div>
  );
}
