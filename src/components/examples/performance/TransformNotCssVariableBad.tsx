import { useRef } from 'react';

const CHILDREN = Array.from({ length: 240 }, (_, i) => i);
const MAX = 140;

export function TransformNotCssVariableBad() {
  const gridRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);
  const worstRef = useRef(0);
  const startX = useRef(0);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    const grid = gridRef.current;
    if (!grid) return;
    const dx = Math.max(0, Math.min(MAX, clientX - startX.current));

    const t0 = performance.now();
    // Mutating a custom property on the parent dirties every descendant that reads it:
    // the browser must recalculate styles for all 240 children on every pointer move.
    grid.style.setProperty('--drag', `${dx}px`);
    // Force the style + layout flush now so we can actually measure what the frame will cost.
    void grid.getBoundingClientRect().width;
    const cost = performance.now() - t0;

    if (cost > worstRef.current) worstRef.current = cost;
    if (readoutRef.current) {
      readoutRef.current.textContent = `style flush: ${cost.toFixed(2)} ms · worst: ${worstRef.current.toFixed(2)} ms`;
    }
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <div
          className="cursor-grab touch-none rounded-md bg-muted p-2 active:cursor-grabbing"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            dragging.current = true;
            startX.current = e.clientX;
          }}
          onPointerMove={(e) => {
            if (dragging.current) move(e.clientX);
          }}
          onPointerUp={() => {
            dragging.current = false;
          }}
        >
          <div className="mb-2 text-xs text-muted-foreground">Drag left → right in this panel</div>
          <div ref={gridRef} className="grid grid-cols-12 gap-0.5 overflow-hidden">
            {CHILDREN.map((i) => (
              <div
                key={i}
                // Every child reads the parent's variable.
                style={{ transform: 'translateX(var(--drag, 0px))' }}
                className="h-2 rounded-sm bg-primary/60"
              />
            ))}
          </div>
        </div>

        <div ref={readoutRef} className="text-xs tabular-nums text-error">
          style flush: — · worst: —
        </div>
      </div>
      <p className="text-xs text-error">
        Driving 240 child transforms through <code>--drag</code> on the parent: each pointer move
        triggers a style recalc across the whole subtree. The measured flush above is the cost you
        pay every frame of the gesture.
      </p>
    </div>
  );
}
