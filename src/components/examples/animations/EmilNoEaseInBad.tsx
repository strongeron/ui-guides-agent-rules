import { useEffect, useRef, useState } from 'react';

/**
 * Bad: the panel enters with `ease-in` — it creeps for the first ~120ms,
 * which is exactly the moment the user is looking at it.
 */
export function EmilNoEaseInBad() {
  const [entered, setEntered] = useState(false);
  const frame = useRef(0);

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

  return (
    <div className="w-full max-w-sm space-y-4">
      <button
        onClick={replay}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Replay entrance
      </button>

      <div className="h-24 rounded-lg bg-muted p-3 overflow-hidden">
        <div
          className="rounded-md border border-border bg-card p-3 text-sm text-card-foreground"
          style={{
            // ease-in: slow at the start, fast at the end. The delay lands on
            // the exact frames the user is watching.
            transition: entered
              ? 'transform 260ms cubic-bezier(0.42, 0, 1, 1), opacity 260ms cubic-bezier(0.42, 0, 1, 1)'
              : 'none',
            transform: entered ? 'translateY(0)' : 'translateY(-28px)',
            opacity: entered ? 1 : 0,
          }}
        >
          Deploy finished
        </div>
      </div>

      <p className="text-xs text-error">
        ease-in (260ms): the panel hesitates before it moves, so the interface reads as laggy
      </p>
    </div>
  );
}
