import { useRef, useState } from 'react';

const ROWS = ['Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Katherine Johnson', 'Edsger Dijkstra'];

type Axis = 'x' | 'y' | null;

/**
 * A swipeable row inside a vertical scroller, with no movement threshold.
 * The axis is decided on the very first pointermove — and the first pointermove of
 * a vertical scroll almost always carries a pixel or two of horizontal wobble.
 * So the row commits to a swipe, and the scroll the user actually wanted is gone.
 */
export function GestureHysteresisBad() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<number | null>(null);
  const originRef = useRef({ x: 0, y: 0, scrollTop: 0 });
  const axisRef = useRef<Axis>(null);

  const [axis, setAxis] = useState<Axis>(null);
  const [offsets, setOffsets] = useState<Record<string, number>>({});
  const [log, setLog] = useState('Try to scroll the list by dragging it vertically.');

  const end = () => {
    pointerRef.current = null;
    axisRef.current = null;
    setAxis(null);
    setOffsets({});
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-3">
          Drag <span className="text-foreground">vertically</span> to scroll. Try to keep your hand
          perfectly straight — you can&apos;t.
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
                setLog('Dragging…');
              }}
              onPointerMove={(e) => {
                if (pointerRef.current !== e.pointerId) return;
                const dx = e.clientX - originRef.current.x;
                const dy = e.clientY - originRef.current.y;

                // No threshold. The first move that reports any horizontal component at all
                // commits the gesture to a swipe — permanently.
                if (axisRef.current === null) {
                  const decided: Axis = dx !== 0 ? 'x' : 'y';
                  axisRef.current = decided;
                  setAxis(decided);
                  if (decided === 'x') {
                    setLog(
                      `Committed to SWIPE after ${Math.abs(dx)}px of horizontal movement (and ${Math.abs(dy)}px of vertical). The scroll is hijacked.`,
                    );
                  }
                }

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
            <dt className="text-muted-foreground">threshold</dt>
            <dd className="font-mono text-destructive">none — 1px commits</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">locked axis</dt>
            <dd className="font-mono text-destructive">{axis ?? '—'}</dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
          {log}
        </p>
      </div>
      <p className="text-xs text-destructive mt-4">
        No movement threshold — 2px of horizontal jitter during a scroll commits to a swipe and steals it
      </p>
    </div>
  );
}
