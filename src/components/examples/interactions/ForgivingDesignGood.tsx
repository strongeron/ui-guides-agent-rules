import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export function ForgivingDesignGood() {
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
            className="h-2 flex-1 cursor-pointer accent-primary"
            aria-label="Volume"
          />
          <span className="w-8 text-right text-sm tabular-nums text-muted-foreground">
            {volume}
          </span>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <button
            onClick={() => step(-10)}
            aria-label="Decrease volume"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Minus className="h-5 w-5" />
          </button>
          <button
            onClick={() => step(10)}
            aria-label="Increase volume"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          44px hit targets are easy to tap. Generous padding and clear hover states provide feedback.
        </p>
      </div>
      <p className="mt-4 text-xs text-success">
        44px+ hit targets with clear affordances
      </p>
    </div>
  );
}
