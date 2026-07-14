import { useRef, useState } from 'react';

const SLIDE_W = 160;
const SLIDES = ['One', 'Two', 'Three', 'Four', 'Five'];
const MAX = SLIDES.length - 1;

/**
 * Snaps to whichever slide is nearest the *release point*. Velocity is measured
 * (we even display it) and then thrown away. A hard flick and a gentle nudge that
 * end at the same x produce the same result: one slide. The carousel cannot tell
 * a throw from a push.
 */
export function MomentumProjectionBad() {
  const pointerRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const lastRef = useRef({ x: 0, t: 0 });
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [index, setIndex] = useState(0);
  const [log, setLog] = useState('Flick hard. Then nudge. Compare.');

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-3">
          Drag the strip and let go. The landing slide is whichever one is closest to where your finger
          stopped — nothing more.
        </p>

        <div className="relative h-24 overflow-hidden rounded-md border border-border bg-muted">
          <div
            onPointerDown={(e) => {
              if (pointerRef.current !== null) return;
              pointerRef.current = e.pointerId;
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
                setVelocity(((e.clientX - lastRef.current.x) / dt) * 1000); // px/s
                lastRef.current = { x: e.clientX, t: now };
              }
              setX(e.clientX - startRef.current);
            }}
            onPointerUp={(e) => {
              if (pointerRef.current !== e.pointerId) return;
              pointerRef.current = null;
              setDragging(false);

              // Velocity is right there. It is not used.
              const next = Math.min(MAX, Math.max(0, Math.round(-x / SLIDE_W)));
              setIndex(next);
              setX(-next * SLIDE_W);
              setLog(
                `Released at ${Math.round(-x)}px moving ${Math.abs(Math.round(velocity))} px/s → snapped to the nearest slide from the release point: "${SLIDES[next]}".`,
              );
            }}
            onPointerCancel={() => {
              pointerRef.current = null;
              setDragging(false);
              setX(-index * SLIDE_W);
            }}
            style={{ transform: `translate3d(${x}px, 0, 0)`, touchAction: 'pan-y' }}
            className={`absolute inset-y-2 left-2 flex cursor-grab select-none gap-2 ${
              dragging ? '' : 'transition-transform duration-300'
            }`}
          >
            {SLIDES.map((slide, i) => (
              <div
                key={slide}
                style={{ width: SLIDE_W - 8 }}
                className={`grid shrink-0 place-items-center rounded-md border border-border text-sm ${
                  i === index ? 'bg-card text-foreground' : 'bg-card/50 text-muted-foreground'
                }`}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>

        <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div>
            <dt className="text-muted-foreground">release velocity</dt>
            <dd className="font-mono text-destructive">{Math.abs(Math.round(velocity))} px/s (ignored)</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">projected landing</dt>
            <dd className="font-mono text-destructive">never computed</dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
          {log}
        </p>
      </div>
      <p className="text-xs text-destructive mt-4">
        Snaps from the release point — a hard flick still advances only one slide
      </p>
    </div>
  );
}
