import { useState } from 'react';

export function RefsBypassRenderBad() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [renderCount, setRenderCount] = useState(0);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div
        className="bg-card border border-border rounded-lg p-4 h-40 relative cursor-crosshair"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          setRenderCount(c => c + 1);
        }}
      >
        <div className="text-xs text-muted-foreground">Move your mouse here</div>
        <div className="absolute bottom-2 left-2 text-xs text-foreground font-mono">
          x: {Math.round(pos.x)}, y: {Math.round(pos.y)}
        </div>
        <div className="absolute bottom-2 right-2 text-xs text-error font-mono">
          Renders: {renderCount}
        </div>
      </div>
      <p className="text-xs text-error">useState on every mousemove — full re-render each time</p>
    </div>
  );
}
