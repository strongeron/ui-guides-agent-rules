import { useEffect, useRef, useState } from 'react';

/**
 * Bad: the same bottom-up reveal, but built by animating `height` from 0.
 * The container's box really does grow, so every sibling below it is shoved
 * down for the whole 700ms — a reveal that reflows the page.
 */
export function ClipPathRevealBad() {
  const [revealed, setRevealed] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    frame.current = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const replay = () => {
    setRevealed(false);
    frame.current = requestAnimationFrame(() =>
      requestAnimationFrame(() => setRevealed(true))
    );
  };

  return (
    <div className="w-full space-y-4">
      <button
        onClick={replay}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        Replay reveal
      </button>

      <div className="rounded-lg bg-muted p-3">
        <div
          className="overflow-hidden"
          style={{
            transition: 'height 700ms cubic-bezier(0.77, 0, 0.175, 1)',
            height: revealed ? '104px' : '0px',
          }}
        >
          <div className="rounded-md border border-border bg-card p-3 text-sm text-card-foreground">
            <p className="font-medium">Deployment summary</p>
            <p className="text-muted-foreground mt-1">
              12 files changed across 3 packages. Build finished in 41s.
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          ↑ this line is pushed down for the whole animation
        </p>
      </div>

      <p className="text-xs text-destructive">
        Animating height re-runs layout every frame and drags every sibling below with it. The reveal is real, but so
        is the reflow.
      </p>
    </div>
  );
}
