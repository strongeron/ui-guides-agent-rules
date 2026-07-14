import { useRef, useState, useEffect } from 'react';

export function GestureTouchActionBad() {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [cancels, setCancels] = useState(0);
  const [computed, setComputed] = useState('');

  // Report what the browser actually resolved, rather than asserting it.
  useEffect(() => {
    if (surfaceRef.current) {
      setComputed(getComputedStyle(surfaceRef.current).touchAction);
    }
  }, []);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-3">
          Drag to pan the grid. On touch, the scroll strip below claims the gesture first: the browser fires
          <code> pointercancel</code> and the pan dies mid-drag.
        </p>

        {/* A scrollable ancestor: exactly the situation where the browser competes for the gesture. */}
        <div className="overflow-x-auto overscroll-x-contain border border-border rounded-md">
          <div
            ref={surfaceRef}
            // No touch-action: the browser keeps native panning/zooming for itself.
            onPointerDown={(e) => {
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
              // The browser took the gesture. Our drag is over whether we like it or not.
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
            <dd className="font-mono text-error">{cancels}</dd>
          </div>
        </dl>
      </div>
      <p className="text-xs text-error mt-4">
        With <code>touch-action: auto</code> the browser cancels the pointer stream and scrolls instead
      </p>
    </div>
  );
}
