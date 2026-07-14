import { useRef, useState } from 'react';

const SLIDE_W = 160;
const SLIDES = ['One', 'Two', 'Three', 'Four', 'Five'];
const MAX = SLIDES.length - 1;

/**
 * Apple's projection function, verbatim from the Designing Fluid Interfaces sample.
 * Exponential decay — NOT the physics-textbook v^2/(2*decel), which is not what ships.
 */
function project(initialVelocity: number, decelerationRate = 0.998) {
  return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

export function MomentumProjectionGood() {
  const pointerRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const lastRef = useRef({ x: 0, t: 0 });
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [index, setIndex] = useState(0);
  const [log, setLog] = useState('Flick hard — it throws. Nudge — it steps.');

  // Where the strip would coast to a stop if we let it. Live, during the drag.
  const projected = x + project(velocity);
  const projectedIndex = Math.min(MAX, Math.max(0, Math.round(-projected / SLIDE_W)));

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-3">
          Drag the strip and let go. The landing slide is the one nearest where the strip
          <em> would coast to</em> — so a flick throws it, a nudge steps it.
        </p>

        <div className="relative h-24 overflow-hidden rounded-md border border-border bg-muted">
          {/* Live marker for the projected resting position. */}
          {dragging && (
            <div
              aria-hidden
              style={{ transform: `translate3d(${projected + SLIDE_W / 2}px, 0, 0)` }}
              className="absolute inset-y-0 left-2 z-10 w-0.5 bg-success"
            />
          )}

          <div
            onPointerDown={(e) => {
              if (pointerRef.current !== null) return;
              pointerRef.current = e.pointerId;
              e.currentTarget.setPointerCapture(e.pointerId);
              startRef.current = e.clientX - x;
              lastRef.current = { x: e.clientX, t: performance.now() };
              setVelocity(0);
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

              // Snap to the target nearest the PROJECTED point, not the release point.
              const releaseIndex = Math.min(MAX, Math.max(0, Math.round(-x / SLIDE_W)));
              const next = projectedIndex;
              setIndex(next);
              setX(-next * SLIDE_W);

              const thrown = next - releaseIndex;
              setLog(
                `Released at ${Math.round(-x)}px moving ${Math.abs(Math.round(velocity))} px/s → projects to ${Math.round(-projected)}px → "${SLIDES[next]}"` +
                  (thrown !== 0
                    ? `, ${Math.abs(thrown)} slide${Math.abs(thrown) > 1 ? 's' : ''} past where the release point alone would have landed.`
                    : '. A nudge: momentum added nothing.'),
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
            <dd className="font-mono text-foreground">{Math.abs(Math.round(velocity))} px/s</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">projected landing</dt>
            <dd className="font-mono text-success">
              {dragging ? `${Math.round(-projected)}px → "${SLIDES[projectedIndex]}"` : `"${SLIDES[index]}"`}
            </dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
          {log}
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        project(v) = (v/1000)·d/(1−d), d≈0.998 — snap to the target nearest the projected point
      </p>
    </div>
  );
}
