import { useState } from 'react';
import { Layers, Check } from 'lucide-react';

export function FlipCardDepthGood() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-xl bg-muted/40 py-8">
      {/* perspective on the container gives the flip a real vanishing point. */}
      <div className="h-44 w-64" style={{ perspective: '900px' }}>
        <button
          onClick={() => setFlipped((f) => !f)}
          aria-pressed={flipped}
          className="relative h-full w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
          }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-gradient-to-br from-card to-muted text-foreground shadow-xl"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Layers className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium">Front</span>
            <span className="text-xs text-muted-foreground">tap to flip</span>
          </div>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl border border-primary bg-primary text-primary-foreground shadow-xl"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
              <Check className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium">Back — real depth</span>
            <span className="text-xs text-primary-foreground/80">a genuine second face</span>
          </div>
        </button>
      </div>
      <p className="text-center text-xs text-success">
        preserve-3d keeps both faces in 3D space; backface-visibility:hidden hides each one as it turns away,
        so the flip reveals a genuine back.
      </p>
    </div>
  );
}
