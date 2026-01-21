import { useState } from 'react';

export function IbelickBaseUiBad() {
  const [value, setValue] = useState(50);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Custom slider:</label>
        <div
          className="relative h-2 bg-muted rounded-full cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = ((e.clientX - rect.left) / rect.width) * 100;
            setValue(Math.round(percent));
          }}
        >
          <div
            className="absolute h-full bg-primary rounded-full"
            style={{ width: `${value}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 size-4 bg-primary rounded-full"
            style={{ left: `calc(${value}% - 8px)` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">Value: {value}</p>
      </div>
      <p className="text-xs text-destructive">
        Custom slider: no keyboard support, no ARIA, click-only interaction
      </p>
    </div>
  );
}
