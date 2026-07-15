import { useState } from 'react';

/**
 * A model idling on a perpetual auto-rotate. The reduced-motion preference is honored
 * nowhere — because the spin lives in a keyframe/loop the media query never touches —
 * so a vestibular user gets viewport-filling motion they cannot turn off.
 */
export function AmbientMotionReducedBad() {
  const [reduce, setReduce] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <style>{`
        @keyframes amr-spin-bad { to { transform: rotateY(360deg); } }
        .amr-cube-bad { animation: amr-spin-bad 5s linear infinite; }
      `}</style>
      <div className="rounded-lg border border-border bg-card p-4">
        <label className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={reduce}
            onChange={(e) => setReduce(e.target.checked)}
            className="size-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
          Simulate prefers-reduced-motion: reduce
        </label>
        <div className="flex justify-center py-6" style={{ perspective: '600px' }}>
          {/* Bug: auto-rotation ignores the preference entirely */}
          <div
            className="amr-cube-bad grid size-20 place-items-center rounded-lg bg-primary font-semibold text-primary-foreground"
            style={{ transformStyle: 'preserve-3d' }}
          >
            3D
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-destructive">
        Toggle reduced motion — it keeps spinning. Ambient 3D motion that never reads the preference.
      </p>
    </div>
  );
}
