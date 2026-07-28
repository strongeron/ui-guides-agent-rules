import { useState } from 'react';

const TRAVEL_PX = 60;
const SCALE = 0.5;
// The translate is applied inside the already-halved space, so the word starts
// TRAVEL_PX * SCALE below rest — and the gap grows as the scale animates to 1.
const EFFECTIVE_PX = TRAVEL_PX * SCALE;

export function TransformOrderChangesResultBad() {
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

        <div className="absolute inset-x-4 top-[76px] border-t border-dashed border-destructive" />
        <span className="absolute right-4 top-[80px] text-[10px] text-destructive">
          intended start ({TRAVEL_PX}px)
        </span>

        <span key={run} className="order-bad-word absolute left-4 top-4 text-2xl font-semibold">
          Rise
        </span>
      </div>

      <style>{`
        .order-bad-word {
          transform-origin: top left;
          animation: orderBad 1100ms linear 800ms both;
        }
        @keyframes orderBad {
          /* scale first: every function after it is measured in the shrunk space */
          from { transform: scale(${SCALE}) translateY(${TRAVEL_PX}px); }
          to   { transform: scale(1) translateY(0); }
        }
      `}</style>

      <p className="text-xs text-destructive">
        <code>
          scale({SCALE}) translateY({TRAVEL_PX}px)
        </code>{' '}
        starts the word at {EFFECTIVE_PX}px, well short of the marker — and the distance grows
        as the scale animates, bending the path into an easing that is in no easing constant
      </p>
    </div>
  );
}
