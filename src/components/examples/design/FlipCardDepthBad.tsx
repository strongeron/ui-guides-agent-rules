import { useState } from 'react';

export function FlipCardDepthBad() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flex w-full max-w-sm flex-col items-center py-8">
      <div className="h-40 w-64">
        {/* No perspective, no preserve-3d, no backface-visibility. */}
        <button
          onClick={() => setFlipped((f) => !f)}
          aria-pressed={flipped}
          className="flex h-full w-full items-center justify-center rounded-xl bg-card text-sm text-foreground shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ transition: 'transform 0.5s', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)' }}
        >
          Tap to flip
        </button>
      </div>
      <p className="mt-6 text-center text-xs text-destructive">
        Without perspective or preserve-3d, rotateY just mirror-flips one flat element — the label turns backwards and there is no depth or real back face.
      </p>
    </div>
  );
}
