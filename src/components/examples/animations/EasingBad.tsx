import { useState } from 'react';

export function EasingBad() {
  const [replay, setReplay] = useState(0);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setReplay((v) => v + 1)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Replay
      </button>
      <div className="relative h-8 w-64 max-w-full rounded-full bg-muted/50">
        <div
          key={replay}
          className="absolute top-1 left-1 size-6 rounded-full bg-primary"
          style={{ animation: 'easeRace 1200ms linear both' }}
        />
      </div>
      <style>{`@keyframes easeRace { from { transform: translateX(0); } to { transform: translateX(224px); } }`}</style>
      <p className="text-xs text-destructive">
        <code>linear</code> — the dot travels at one constant speed the whole way, which reads as robotic
      </p>
    </div>
  );
}
