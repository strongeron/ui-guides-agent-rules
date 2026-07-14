import { useRef } from 'react';

const CHILDREN = Array.from({ length: 240 }, (_, i) => i);
const MAX = 140;

export function TransformNotCssVariableGood() {
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
    // Set transform directly on the one element that actually animates. The 240 children ride
    // along inside it — no descendant's style is invalidated.
    grid.style.transform = `translateX(${dx}px)`;
    // Same forced style + layout flush as the bad example, so the numbers are comparable.
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
          <div className="overflow-hidden">
            <div ref={gridRef} className="grid grid-cols-12 gap-0.5 will-change-transform">
              {CHILDREN.map((i) => (
                <div key={i} className="h-2 rounded-sm bg-primary/60" />
              ))}
            </div>
          </div>
        </div>

        <div ref={readoutRef} className="text-xs tabular-nums text-success">
          style flush: — · worst: —
        </div>
      </div>
      <p className="text-xs text-success">
        One <code>transform</code> on the element that moves. Identical motion, but only a single
        element&apos;s style is invalidated per frame — compare the flush numbers against the bad
        example on the same drag.
      </p>
    </div>
  );
}
