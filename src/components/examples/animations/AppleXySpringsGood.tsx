import { useCallback, useEffect, useRef, useState } from 'react';
import { useSimulatedReducedMotion } from '@/hooks/useSimulatedReducedMotion';

/**
 * Good: TWO independent springs — one on x, one on y — each seeded with its own
 * axis velocity at release.
 *
 * Each axis settles on its own clock, so the card keeps travelling the way you
 * threw it and curves back to the origin instead of being yanked home in a
 * straight line. Under reduced motion the spring is dropped entirely.
 */

type Point = { x: number; y: number };

const STIFFNESS = 180;
const DAMPING = 18;
const BOUND_X = 100;
const BOUND_Y = 58;

const clamp = (v: number, limit: number) => Math.max(-limit, Math.min(limit, v));

export function AppleXySpringsGood() {
  const [pos, setPos] = useState<Point>({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Point[]>([]);
  const [dragging, setDragging] = useState(false);
  const reduced = useSimulatedReducedMotion();

  const raf = useRef(0);
  const drag = useRef({ startX: 0, startY: 0, originX: 0, originY: 0 });
  const velocity = useRef<Point>({ x: 0, y: 0 });
  const lastMove = useRef({ x: 0, y: 0, t: 0 });

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const release = useCallback(
    (from: Point, reduceMotion: boolean) => {
      if (reduceMotion) {
        setTrail([from, { x: 0, y: 0 }]);
        setPos({ x: 0, y: 0 });
        return;
      }

      // Two springs. Each one gets the velocity of ITS OWN axis, and integrates
      // on its own — no shared scalar, nothing to desync.
      let x = from.x;
      let y = from.y;
      let vx = velocity.current.x;
      let vy = velocity.current.y;
      let last = performance.now();
      const path: Point[] = [from];

      const step = (now: number) => {
        const dt = Math.min((now - last) / 1000, 1 / 30);
        last = now;

        vx += (-STIFFNESS * x - DAMPING * vx) * dt;
        vy += (-STIFFNESS * y - DAMPING * vy) * dt;
        x += vx * dt;
        y += vy * dt;

        const next = { x, y };
        path.push(next);
        setPos(next);
        setTrail([...path]);

        const settled =
          Math.hypot(x, y) < 0.4 && Math.hypot(vx, vy) < 4;
        if (settled) {
          setPos({ x: 0, y: 0 });
          return;
        }
        raf.current = requestAnimationFrame(step);
      };

      raf.current = requestAnimationFrame(step);
    },
    []
  );

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
    release(pos, reduced);
  };

  return (
    <div className="w-full max-w-sm space-y-3">
      <p className="text-xs text-muted-foreground">
        Same card, same throw — watch the return path bend with the gesture.
      </p>

      <div className="relative h-[180px] w-[280px] overflow-hidden rounded-lg border border-border bg-muted">
        <svg
          viewBox="0 0 280 180"
          className="pointer-events-none absolute inset-0 h-full w-full text-success"
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

      <p className="text-xs text-success">
        {reduced
          ? 'Reduced motion: the spring is dropped and the card returns instantly — the straight trail here is the correct behaviour, not the bug.'
          : 'One spring per axis, each seeded with its own release velocity — the card carries the throw through and curves home.'}
      </p>
    </div>
  );
}
