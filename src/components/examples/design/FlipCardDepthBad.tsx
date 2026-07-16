import { useState } from 'react';
import { Layers } from 'lucide-react';

export function FlipCardDepthBad() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-xl bg-muted/40 py-8">
      <div className="h-44 w-64">
        {/* No perspective, no preserve-3d, no backface-visibility. */}
        <button
          onClick={() => setFlipped((f) => !f)}
          aria-pressed={flipped}
          className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border border-border bg-gradient-to-br from-card to-muted text-foreground shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          style={{ transition: 'transform 0.6s', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)' }}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Layers className="h-5 w-5" />
          </span>
          <span className="text-sm font-medium">Front</span>
          <span className="text-xs text-muted-foreground">tap to flip</span>
        </button>
      </div>
      <p className="text-center text-xs text-destructive">
        Without perspective or preserve-3d, rotateY just mirror-flips one flat element — the label turns
        backwards and there is no depth or real back face.
      </p>
    </div>
  );
}
