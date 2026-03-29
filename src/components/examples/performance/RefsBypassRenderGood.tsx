import { useRef, useCallback } from 'react';

export function RefsBypassRenderGood() {
  const coordsRef = useRef<HTMLDivElement>(null);
  const countRef = useRef(0);
  const countDisplayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    if (coordsRef.current) coordsRef.current.textContent = `x: ${x}, y: ${y}`;
    countRef.current++;
    if (countDisplayRef.current) countDisplayRef.current.textContent = `Updates: ${countRef.current}`;
  }, []);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div
        className="bg-card border border-border rounded-lg p-4 h-40 relative cursor-crosshair"
        onMouseMove={handleMouseMove}
      >
        <div className="text-xs text-muted-foreground">Move your mouse here</div>
        <div ref={coordsRef} className="absolute bottom-2 left-2 text-xs text-foreground font-mono">
          x: 0, y: 0
        </div>
        <div ref={countDisplayRef} className="absolute bottom-2 right-2 text-xs text-success font-mono">
          Updates: 0
        </div>
      </div>
      <p className="text-xs text-success">Refs + direct DOM — zero re-renders, same result</p>
    </div>
  );
}
