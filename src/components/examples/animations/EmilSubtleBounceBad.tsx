import { useEffect, useRef, useState } from 'react';

/**
 * Bad: a high-bounce spring on a settings popover. It overshoots hard and
 * wobbles back — roughly bounce 0.6+. It reads as a toy, and on a control the
 * user opens fifty times a day it reads as broken.
 */
export function EmilSubtleBounceBad() {
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
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        Replay popover
      </button>

      <div className="h-28 rounded-lg bg-muted p-3 overflow-hidden">
        <div
          className="origin-top rounded-md border border-border bg-card p-3 text-sm text-card-foreground"
          style={{
            // Huge overshoot: the curve blows past 1 and springs back.
            transition: entered
              ? 'transform 520ms cubic-bezier(0.34, 2.8, 0.5, 1)'
              : 'none',
            transform: entered ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(-14px)',
            opacity: entered ? 1 : 0,
          }}
        >
          Notification settings
        </div>
      </div>

      <p className="text-xs text-error">
        Bounce ~0.6 on a utility popover — cartoonish, and it draws attention it has not earned
      </p>
    </div>
  );
}
