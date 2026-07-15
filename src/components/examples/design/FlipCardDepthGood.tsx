import { useState } from 'react';

export function FlipCardDepthGood() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flex w-full max-w-sm flex-col items-center py-8">
      {/* perspective on the container gives the flip a real vanishing point. */}
      <div className="h-40 w-64" style={{ perspective: '800px' }}>
        <button
          onClick={() => setFlipped((f) => !f)}
          aria-pressed={flipped}
          className="relative h-full w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.5s',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center rounded-xl bg-card text-sm text-foreground shadow-md"
            style={{ backfaceVisibility: 'hidden' }}
          >
            Front — tap to flip
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center rounded-xl bg-primary text-sm text-primary-foreground shadow-md"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            Back — real depth
          </div>
        </button>
      </div>
      <p className="mt-6 text-center text-xs text-success">
        preserve-3d keeps both faces in 3D space; backface-visibility:hidden hides each one as it turns away, so the flip reveals a genuine back.
      </p>
    </div>
  );
}
