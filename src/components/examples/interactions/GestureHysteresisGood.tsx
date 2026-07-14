import { useRef, useState } from 'react';

const ROWS = ['Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Katherine Johnson', 'Edsger Dijkstra'];
const THRESHOLD = 10; // px of hysteresis before the gesture is allowed to mean anything

type Axis = 'x' | 'y' | null;

/**
 * Hysteresis: the gesture stays undecided until it has travelled ~10px from its origin.
 * Only then do we compare |dx| against |dy| and lock the axis for the rest of the drag.
 * Below the threshold, the wobble in a vertical scroll is just wobble.
 */
export function GestureHysteresisGood() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<number | null>(null);
  const originRef = useRef({ x: 0, y: 0, scrollTop: 0 });
  const axisRef = useRef<Axis>(null);

  const [axis, setAxis] = useState<Axis>(null);
  const [distance, setDistance] = useState(0);
  const [offsets, setOffsets] = useState<Record<string, number>>({});
  const [log, setLog] = useState('Drag vertically to scroll, horizontally to swipe a row.');

  const end = () => {
    pointerRef.current = null;
    axisRef.current = null;
    setAxis(null);
    setDistance(0);
    setOffsets({});
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-3">
          Drag <span className="text-foreground">vertically</span> to scroll, or{' '}
          <span className="text-foreground">horizontally</span> to swipe a row. Wobble all you like: nothing
          commits until you have moved {THRESHOLD}px.
        </p>

        <div
          ref={scrollRef}
          className="h-[180px] overflow-hidden rounded-md border border-border bg-muted"
        >
          {ROWS.map((row) => (
            <div
              key={row}
              onPointerDown={(e) => {
                if (pointerRef.current !== null) return;
                pointerRef.current = e.pointerId;
                e.currentTarget.setPointerCapture(e.pointerId);
                originRef.current = {
                  x: e.clientX,
                  y: e.clientY,
                  scrollTop: scrollRef.current?.scrollTop ?? 0,
                };
                axisRef.current = null;
                setLog('Undecided — move 10px to commit.');
              }}
              onPointerMove={(e) => {
                if (pointerRef.current !== e.pointerId) return;
                const dx = e.clientX - originRef.current.x;
                const dy = e.clientY - originRef.current.y;
                const travelled = Math.hypot(dx, dy);
                setDistance(travelled);

                // Undecided until the gesture has produced enough evidence of intent.
                if (axisRef.current === null) {
                  if (travelled < THRESHOLD) return;
                  // Enough movement. Now — and only now — pick the dominant axis, and keep it.
                  const decided: Axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
                  axisRef.current = decided;
                  setAxis(decided);
                  setLog(
                    `Locked to ${decided === 'x' ? 'SWIPE' : 'SCROLL'} at ${Math.round(travelled)}px: |dx| ${Math.abs(Math.round(dx))} vs |dy| ${Math.abs(Math.round(dy))}. Tracking 1:1 from here.`,
                  );
                }

                // Past the threshold, track the finger 1:1 on the locked axis. No re-evaluation,
                // so the gesture can never flip axes mid-drag.
                if (axisRef.current === 'x') {
                  setOffsets({ [row]: Math.max(-96, Math.min(0, dx)) });
                } else if (scrollRef.current) {
                  scrollRef.current.scrollTop = originRef.current.scrollTop - dy;
                }
              }}
              onPointerUp={end}
              onPointerCancel={end}
              style={{
                transform: `translate3d(${offsets[row] ?? 0}px, 0, 0)`,
                touchAction: 'none',
              }}
              className="flex h-[60px] cursor-grab select-none items-center border-b border-border bg-card px-4 text-sm text-foreground"
            >
              {row}
            </div>
          ))}
        </div>

        <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div>
            <dt className="text-muted-foreground">travelled</dt>
            <dd className="font-mono text-foreground">
              {Math.round(distance)}px / {THRESHOLD}px
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">locked axis</dt>
            <dd className="font-mono text-success">{axis ?? 'undecided'}</dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
          {log}
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        ~10px of hysteresis before committing to an axis, then 1:1 tracking — jitter never steals the scroll
      </p>
    </div>
  );
}
