import { useEffect, useRef, useState } from 'react';

/**
 * Bad: the built-in `ease-out` keyword is cubic-bezier(0, 0, 0.58, 1) — a very
 * shallow curve. Over a long distance it reads as an almost-linear slide with a
 * mushy stop. The motion has no point of view.
 */
export function EmilStrongEasingBad() {
  const [moved, setMoved] = useState(false);
  const frame = useRef(0);

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
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        Replay
      </button>

      <div className="relative h-16 rounded-lg bg-muted overflow-hidden">
        <div
          className="absolute top-4 left-2 h-8 w-8 rounded-md bg-primary"
          style={{
            // Built-in keyword easing — weak, near-linear.
            transition: moved ? 'transform 500ms ease-out' : 'none',
            transform: moved ? 'translateX(240px)' : 'translateX(0)',
          }}
        />
      </div>

      <p className="text-xs text-error">
        Built-in <code>ease-out</code> = cubic-bezier(0, 0, 0.58, 1) — too weak to read as deliberate motion
      </p>
    </div>
  );
}
