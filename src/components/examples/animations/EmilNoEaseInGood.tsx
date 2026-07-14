import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Good: the same 260ms, but `ease-out`. The element covers most of the
 * distance in the first frames, so it feels faster than the ease-in version
 * even though the clock time is identical.
 */
export function EmilNoEaseInGood() {
  const [entered, setEntered] = useState(false);
  const frame = useRef(0);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    frame.current = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const replay = () => {
    setEntered(false);
    frame.current = requestAnimationFrame(() =>
      requestAnimationFrame(() => setEntered(true))
    );
  };

  const motion = reduced
    ? { transition: entered ? 'opacity 150ms linear' : 'none', transform: 'none' }
    : {
        transition: entered
          ? 'transform 260ms cubic-bezier(0.23, 1, 0.32, 1), opacity 260ms cubic-bezier(0.23, 1, 0.32, 1)'
          : 'none',
        transform: entered ? 'translateY(0)' : 'translateY(-28px)',
      };

  return (
    <div className="w-full max-w-sm space-y-4">
      <button
        onClick={replay}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        Replay entrance
      </button>

      <div className="h-24 rounded-lg bg-muted p-3 overflow-hidden">
        <div
          className="rounded-md border border-border bg-card p-3 text-sm text-card-foreground"
          style={{ ...motion, opacity: entered ? 1 : 0 }}
        >
          Deploy finished
        </div>
      </div>

      <p className="text-xs text-success">
        ease-out (260ms, same duration): it commits immediately, so it feels faster. Reduced motion gets a plain fade.
      </p>
    </div>
  );
}
