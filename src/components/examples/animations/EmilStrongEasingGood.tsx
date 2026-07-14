import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Good: a strong custom curve — cubic-bezier(0.23, 1, 0.32, 1). It launches
 * hard and decelerates into place, which is what "responsive but composed"
 * actually looks like. Same distance, same 500ms.
 */
export function EmilStrongEasingGood() {
  const [moved, setMoved] = useState(false);
  const frame = useRef(0);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    frame.current = requestAnimationFrame(() => setMoved(true));
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const replay = () => {
    setMoved(false);
    frame.current = requestAnimationFrame(() =>
      requestAnimationFrame(() => setMoved(true))
    );
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <button
        onClick={replay}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Replay
      </button>

      <div className="relative h-16 rounded-lg bg-muted overflow-hidden">
        <div
          className="absolute top-4 left-2 h-8 w-8 rounded-md bg-primary"
          style={{
            transition: reduced
              ? 'none'
              : moved
                ? 'transform 500ms cubic-bezier(0.23, 1, 0.32, 1)'
                : 'none',
            transform: moved ? 'translateX(240px)' : 'translateX(0)',
          }}
        />
      </div>

      <p className="text-xs text-success">
        Strong curve <code>cubic-bezier(0.23, 1, 0.32, 1)</code> — sprints, then settles. Reduced motion snaps instantly.
      </p>
    </div>
  );
}
