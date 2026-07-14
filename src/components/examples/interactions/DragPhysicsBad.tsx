import { useRef, useState } from 'react';

const DISTANCE_THRESHOLD = 140;
const LIMIT = 160;

export function DragPhysicsBad() {
  const startRef = useRef<number | null>(null);
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [log, setLog] = useState('Flick the card away.');

  const reset = () => {
    setX(0);
    setDismissed(false);
    setLog('Flick the card away.');
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-3">
          Drag the card right to dismiss. A quick flick is not enough — it only goes if you physically haul it past
          140px. Drag left and it hits an invisible wall.
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
                // No capture, and no guard: a second finger landing mid-drag re-anchors
                // the origin and the card teleports.
                startRef.current = e.clientX - x;
                setDragging(true);
              }}
              onPointerMove={(e) => {
                if (startRef.current === null) return;
                const next = e.clientX - startRef.current;
                // Hard clamp: an invisible wall instead of resistance.
                setX(Math.max(-LIMIT, Math.min(LIMIT, next)));
              }}
              onPointerLeave={() => {
                // Without setPointerCapture, the pointer stream stops the instant it
                // leaves the card — a fast flick simply loses its own drag.
                if (startRef.current === null) return;
                startRef.current = null;
                setDragging(false);
                setX(0);
                setLog('Pointer left the card mid-drag. Drag lost, snapped back.');
              }}
              onPointerUp={() => {
                if (startRef.current === null) return;
                startRef.current = null;
                setDragging(false);
                // Distance is the only thing that counts. Velocity is never measured.
                if (Math.abs(x) > DISTANCE_THRESHOLD) {
                  setDismissed(true);
                } else {
                  setX(0);
                  setLog(`Travelled ${Math.round(Math.abs(x))}px of ${DISTANCE_THRESHOLD}px. Snapped back.`);
                }
              }}
              style={{ transform: `translate3d(${x}px, 0, 0)` }}
              className={`absolute inset-2 flex cursor-grab touch-none select-none items-center rounded-md border border-border bg-card px-4 ${
                dragging ? '' : 'transition-transform duration-200'
              }`}
            >
              <span className="text-sm text-foreground">Drag me right</span>
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
            <dd className="font-mono text-error">not measured</dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-muted-foreground">{log}</p>
      </div>
      <p className="text-xs text-error mt-4">
        Distance-only threshold, no pointer capture, hard clamp — a flick loses its drag and the card snaps back
      </p>
    </div>
  );
}
