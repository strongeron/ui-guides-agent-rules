import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export function ForgivingDesignBad() {
  const [volume, setVolume] = useState(50);

  const step = (delta: number) =>
    setVolume((v) => Math.min(100, Math.max(0, v + delta)));

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-sm text-foreground">Volume</span>
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="h-0.5 flex-1 cursor-pointer accent-primary"
            aria-label="Volume"
          />
          <span className="w-8 text-right text-sm tabular-nums text-muted-foreground">
            {volume}
          </span>
        </div>
        <div className="mb-4 flex items-center gap-4">
          <button
            onClick={() => step(-10)}
            aria-label="Decrease volume"
            className="flex h-6 w-6 items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <Minus className="h-3 w-3" />
          </button>
          <button
            onClick={() => step(10)}
            aria-label="Increase volume"
            className="flex h-6 w-6 items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          Small hit targets (24px) are hard to tap on mobile. The slider track is thin and difficult to grab.
        </p>
      </div>
      <p className="mt-4 text-xs text-error">
        Tiny hit targets require precise tapping
      </p>
    </div>
  );
}
