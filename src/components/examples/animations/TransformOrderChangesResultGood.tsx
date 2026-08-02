import { useState } from 'react';

const TRAVEL_PX = 60;
const SCALE = 0.5;

export function TransformOrderChangesResultGood() {
  const [run, setRun] = useState(0);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setRun((v) => v + 1)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Replay
      </button>

      <div className="relative h-32 overflow-hidden rounded-lg bg-muted px-4">
        <div className="absolute inset-x-4 top-4 border-t border-border" />
        <span className="absolute right-4 top-[1.15rem] text-[10px] text-muted-foreground">
          rest
        </span>

        <div className="absolute inset-x-4 top-[76px] border-t border-dashed border-success" />
        <span className="absolute right-4 top-[80px] text-[10px] text-success">
          start ({TRAVEL_PX}px)
        </span>

        <span key={run} className="order-good-word absolute left-4 top-4 text-2xl font-semibold">
          Rise
        </span>
      </div>

      <style>{`
        .order-good-word {
          transform-origin: top left;
          animation: orderGood 1100ms linear 800ms both;
        }
        @keyframes orderGood {
          /* translate first, scale last: the two stay independent */
          from { transform: translate3d(0, ${TRAVEL_PX}px, 0) scale(${SCALE}); }
          to   { transform: translate3d(0, 0, 0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .order-good-word { animation: none; }
        }
      `}</style>

      <p className="text-xs text-success">
        <code>
          translate3d(0, {TRAVEL_PX}px, 0) scale({SCALE})
        </code>{' '}
        lands on the marker: {TRAVEL_PX}px is {TRAVEL_PX}px at every scale, so the path is the
        one the easing describes
      </p>
    </div>
  );
}
