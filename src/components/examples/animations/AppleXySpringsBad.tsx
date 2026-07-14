import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Bad: ONE spring animating the 2D distance (Math.hypot(x, y)) back to zero.
 *
 * A single spring can only hold a single velocity, so the two axes are forced to
 * share one — and to arrive at the same instant. Whatever direction you actually
 * threw the card, it slides home along a rigid straight line: the tangential part
 * of your gesture is discarded, and the faster axis drags the slower one with it.
 */

type Point = { x: number; y: number };

const STIFFNESS = 180;
const DAMPING = 18;
const BOUND_X = 100;
const BOUND_Y = 58;

const clamp = (v: number, limit: number) => Math.max(-limit, Math.min(limit, v));

export function AppleXySpringsBad() {
  const [pos, setPos] = useState<Point>({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Point[]>([]);
  const [dragging, setDragging] = useState(false);

  const raf = useRef(0);
  const drag = useRef({ startX: 0, startY: 0, originX: 0, originY: 0 });
  const velocity = useRef<Point>({ x: 0, y: 0 });
  const lastMove = useRef({ x: 0, y: 0, t: 0 });

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const release = useCallback((from: Point) => {
    const distance = Math.hypot(from.x, from.y);
    if (distance < 1) {
      setPos({ x: 0, y: 0 });
      return;
    }

    // The direction is frozen at release, because a scalar spring has no idea
    // there are two axes. All it gets is one number and one velocity.
    const ux = from.x / distance;
    const uy = from.y / distance;

    let d = distance;
    let vd = velocity.current.x * ux + velocity.current.y * uy;
    let last = performance.now();
    const path: Point[] = [from];

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;

      const acceleration = -STIFFNESS * d - DAMPING * vd;
      vd += acceleration * dt;
      d += vd * dt;

      const next = { x: ux * d, y: uy * d };
      path.push(next);
      setPos(next);
      setTrail([...path]);

      if (Math.abs(d) < 0.4 && Math.abs(vd) < 4) {
        setPos({ x: 0, y: 0 });
        return;
      }
      raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    cancelAnimationFrame(raf.current);
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startX: e.clientX, startY: e.clientY, originX: pos.x, originY: pos.y };
    velocity.current = { x: 0, y: 0 };
    lastMove.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    setTrail([]);
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const next = {
      x: clamp(drag.current.originX + (e.clientX - drag.current.startX), BOUND_X),
      y: clamp(drag.current.originY + (e.clientY - drag.current.startY), BOUND_Y),
    };

    const now = performance.now();
    const dt = (now - lastMove.current.t) / 1000;
    if (dt > 0.001) {
      velocity.current = {
        x: velocity.current.x * 0.4 + ((e.clientX - lastMove.current.x) / dt) * 0.6,
        y: velocity.current.y * 0.4 + ((e.clientY - lastMove.current.y) / dt) * 0.6,
      };
      lastMove.current = { x: e.clientX, y: e.clientY, t: now };
    }

    setPos(next);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging(false);
    release(pos);
  };

  return (
    <div className="w-full max-w-sm space-y-3">
      <p className="text-xs text-muted-foreground">
        Drag the card out and throw it — sideways, diagonally, however you like.
      </p>

      <div className="relative h-[180px] w-[280px] overflow-hidden rounded-lg border border-border bg-muted">
        <svg
          viewBox="0 0 280 180"
          className="pointer-events-none absolute inset-0 h-full w-full text-destructive"
          aria-hidden="true"
        >
          <circle cx="140" cy="90" r="3" className="fill-muted-foreground" />
          {trail.length > 1 && (
            <polyline
              points={trail.map((p) => `${140 + p.x},${90 + p.y}`).join(' ')}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>

        <div
          role="button"
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="absolute left-1/2 top-1/2 -ml-[36px] -mt-[24px] flex h-[48px] w-[72px] cursor-grab touch-none select-none items-center justify-center rounded-md border border-border bg-card text-xs text-card-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
        >
          Throw me
        </div>
      </div>

      <p className="text-xs text-destructive">
        One spring on <code>Math.hypot(x, y)</code>: both axes share a single velocity and land
        together, so the return is always a straight radial line — it never follows the throw.
      </p>
    </div>
  );
}
