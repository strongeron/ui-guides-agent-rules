import { useEffect, useRef, useState } from 'react';

/**
 * The idle auto-rotate stops under prefers-reduced-motion (the toggle or the real OS
 * setting), but drag-to-orbit keeps working — because user-initiated motion is exactly
 * the carve-out WCAG 2.3.3 allows. Auto-rotation runs on a rAF loop that is never even
 * started while motion is reduced.
 */
export function AmbientMotionReducedGood() {
  const [reduce, setReduce] = useState(false);
  const cubeRef = useRef<HTMLDivElement>(null);
  const angle = useRef(-20);
  const dragging = useRef(false);
  const lastX = useRef(0);

  const apply = () => {
    if (cubeRef.current) cubeRef.current.style.transform = `rotateY(${angle.current}deg)`;
  };

  useEffect(() => {
    apply();
    const osReduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const allowed = !reduce && !osReduce;
    if (!allowed) return; // reduced: no loop is ever started
    let raf = 0;
    const tick = () => {
      if (!dragging.current) {
        angle.current += 0.4;
        apply();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastX.current = e.clientX;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    angle.current += (e.clientX - lastX.current) * 0.6;
    lastX.current = e.clientX;
    apply();
  };
  const endDrag = (e: React.PointerEvent) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-border bg-card p-4">
        <label className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={reduce}
            onChange={(e) => setReduce(e.target.checked)}
            className="size-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
          Simulate prefers-reduced-motion: reduce
        </label>
        <div className="flex justify-center py-6" style={{ perspective: '600px' }}>
          <div
            ref={cubeRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className="grid size-20 cursor-grab touch-none select-none place-items-center rounded-lg bg-primary font-semibold text-primary-foreground active:cursor-grabbing"
            style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-20deg)' }}
          >
            3D
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground">↔ drag the cube to orbit</p>
      </div>
      <p className="mt-4 text-xs text-success">
        Under reduced motion the idle spin never starts — but drag-to-orbit still works, because
        user-initiated motion is allowed.
      </p>
    </div>
  );
}
