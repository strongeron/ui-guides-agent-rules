import { useEffect, useState } from 'react';

const ROWS = ['Deploy · 2m ago', 'Build · 5m ago', 'Tests · 8m ago'];
const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';

/**
 * Bad: one motion layer. The card translates and fades — and that is the whole
 * animation. The shadow is baked into the card, so it slides along at a fixed
 * depth instead of settling. The rows are fully formed at frame 1 and ride up
 * with the card. Nothing lives behind it. The result reads as a single flat
 * sprite being pushed into place.
 */
export function LottieMotionLayersBad() {
  const [run, setRun] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(false);
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setEntered(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [run]);

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => setRun((r) => r + 1)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        Replay entrance
      </button>

      <div className="relative h-52 overflow-hidden rounded-lg border border-border bg-muted/40 p-6">
        {/* No ambient layer: the background is dead. */}
        <div
          className="rounded-lg border border-border bg-card p-4 shadow-lg"
          style={{
            transition: `transform 320ms ${EASE}, opacity 320ms ${EASE}`,
            transform: entered ? 'translateY(0)' : 'translateY(20px)',
            opacity: entered ? 1 : 0,
          }}
        >
          <p className="text-sm font-medium text-card-foreground">Pipeline</p>
          {/* No secondary layer: the rows are already fully formed at frame 1. */}
          <ul className="mt-3 space-y-1.5">
            {ROWS.map((row) => (
              <li key={row} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                {row}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-xs text-destructive">
        Primary layer only. The shadow travels with the card at a fixed depth, the rows are already legible before
        the card has landed, and the background never moves — so the whole thing reads as one flat sprite sliding in.
      </p>
    </div>
  );
}
