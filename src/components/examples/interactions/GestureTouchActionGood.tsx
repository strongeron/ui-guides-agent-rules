import { useRef, useState, useEffect } from 'react';

export function GestureTouchActionGood() {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [cancels, setCancels] = useState(0);
  const [computed, setComputed] = useState('');

  useEffect(() => {
    if (surfaceRef.current) {
      setComputed(getComputedStyle(surfaceRef.current).touchAction);
    }
  }, []);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-3">
          Drag to pan the grid. <code>touch-action: none</code> opts the surface out of native panning and zooming,
          so every pointer stream reaches our handler intact.
        </p>

        <div className="overflow-x-auto overscroll-x-contain border border-border rounded-md">
          <div
            ref={surfaceRef}
            // touch-action: none — the browser hands the whole gesture to us and never cancels it.
            style={{ touchAction: 'none' }}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              dragRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
            }}
            onPointerMove={(e) => {
              if (!dragRef.current) return;
              setPan({ x: e.clientX - dragRef.current.x, y: e.clientY - dragRef.current.y });
            }}
            onPointerUp={() => {
              dragRef.current = null;
            }}
            onPointerCancel={() => {
              dragRef.current = null;
              setCancels((c) => c + 1);
            }}
            className="relative h-40 w-[520px] cursor-grab select-none bg-muted"
          >
            <div
              className="absolute inset-0"
              style={{
                transform: `translate3d(${pan.x}px, ${pan.y}px, 0)`,
                backgroundImage:
                  'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                opacity: 0.25,
              }}
            />
            <span className="absolute left-3 top-3 text-xs text-muted-foreground">Pan me</span>
          </div>
        </div>

        <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div>
            <dt className="text-muted-foreground">computed touch-action</dt>
            <dd className="font-mono text-foreground">{computed || '—'}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">gestures stolen</dt>
            <dd className="font-mono text-success">{cancels}</dd>
          </div>
        </dl>
      </div>
      <p className="text-xs text-success mt-4">
        <code>touch-action: none</code> keeps the gesture ours — the counter stays at 0 on touch and pointer alike
      </p>
    </div>
  );
}
