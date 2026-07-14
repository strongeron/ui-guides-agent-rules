import { useRef, useState } from 'react';

const DISTANCE_THRESHOLD = 140;
const VELOCITY_THRESHOLD = 0.11; // px per ms
const LIMIT = 160;

/** Rubber band: the further past the edge you pull, the less the card moves. */
function damp(over: number) {
  return (over * LIMIT) / (over + LIMIT);
}

export function DragPhysicsGood() {
  const pointerRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const lastRef = useRef({ x: 0, t: 0 });
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [log, setLog] = useState('Flick the card away — a quick swipe is enough.');

  const reset = () => {
    setX(0);
    setVelocity(0);
    setDismissed(false);
    setLog('Flick the card away — a quick swipe is enough.');
  };

  const end = (dismiss: boolean, message: string) => {
    pointerRef.current = null;
    setDragging(false);
    if (dismiss) setDismissed(true);
    else setX(0);
    setLog(message);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-3">
          Flick the card right — speed alone dismisses it, no need to haul it across. Drag left and it gives, then
          resists harder the further you pull.
        </p>

        <div className="relative h-28 overflow-hidden rounded-md border border-border bg-muted">
          {dismissed ? (
            <div className="flex h-full items-center justify-center">
              <button
                onClick={reset}
                className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground"
              >
                Bring it back
              </button>
            </div>
          ) : (
            <div
              onPointerDown={(e) => {
                // Multi-touch protection: once a drag owns a pointer, extra touch points are ignored.
                if (pointerRef.current !== null) return;
                pointerRef.current = e.pointerId;
                // Pointer capture keeps the stream coming even when the pointer leaves the card.
                e.currentTarget.setPointerCapture(e.pointerId);
                startRef.current = e.clientX - x;
                lastRef.current = { x: e.clientX, t: performance.now() };
                setDragging(true);
              }}
              onPointerMove={(e) => {
                if (pointerRef.current !== e.pointerId) return;

                const now = performance.now();
                const dt = now - lastRef.current.t;
                if (dt > 0) {
                  setVelocity(Math.abs(e.clientX - lastRef.current.x) / dt);
                  lastRef.current = { x: e.clientX, t: now };
                }

                const raw = e.clientX - startRef.current;
                // Rising resistance past the boundary instead of a hard stop.
                const over = Math.abs(raw) - LIMIT;
                const next = over > 0 ? Math.sign(raw) * (LIMIT + damp(over)) : raw;
                setX(next);
              }}
              onPointerUp={(e) => {
                if (pointerRef.current !== e.pointerId) return;
                const flicked = velocity > VELOCITY_THRESHOLD && x > 0;
                const hauled = x > DISTANCE_THRESHOLD;
                end(
                  flicked || hauled,
                  flicked
                    ? `Dismissed on velocity: ${velocity.toFixed(2)} px/ms > ${VELOCITY_THRESHOLD}.`
                    : hauled
                      ? `Dismissed on distance: ${Math.round(x)}px.`
                      : `Too slow (${velocity.toFixed(2)} px/ms) and too short. Sprung back.`,
                );
              }}
              onPointerCancel={() => end(false, 'Gesture cancelled. Sprung back cleanly.')}
              style={{ transform: `translate3d(${x}px, 0, 0)`, touchAction: 'none' }}
              className={`absolute inset-2 flex cursor-grab select-none items-center rounded-md border border-border bg-card px-4 ${
                dragging ? '' : 'transition-transform duration-300'
              }`}
            >
              <span className="text-sm text-foreground">Flick me right</span>
            </div>
          )}
        </div>

        <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div>
            <dt className="text-muted-foreground">distance</dt>
            <dd className="font-mono text-foreground">
              {Math.round(x)}px / {DISTANCE_THRESHOLD}px
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">velocity</dt>
            <dd className="font-mono text-success">
              {velocity.toFixed(2)} / {VELOCITY_THRESHOLD} px/ms
            </dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-muted-foreground">{log}</p>
      </div>
      <p className="text-xs text-success mt-4">
        Velocity dismissal, pointer capture, damped boundary and a single-pointer guard — a flick is enough
      </p>
    </div>
  );
}
