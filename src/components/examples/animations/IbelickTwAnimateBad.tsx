import { useState } from 'react';

export function IbelickTwAnimateBad() {
  const [replay, setReplay] = useState(0);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setReplay((v) => v + 1)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Replay
      </button>
      <div
        key={replay}
        className="p-4 bg-muted rounded-lg text-sm"
        // No animation-fill-mode + a delay: the item shows at its final state,
        // then snaps to opacity 0 when the animation starts — a visible flash.
        style={{ animation: 'twBadFade 400ms ease-out 250ms' }}
      >
        Hand-rolled keyframes, no fill-mode
      </div>
      <style>{`
        @keyframes twBadFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <p className="text-xs text-destructive">
        Custom keyframes with no <code>animation-fill-mode</code> — the item flashes at its final state before it animates in
      </p>
    </div>
  );
}
