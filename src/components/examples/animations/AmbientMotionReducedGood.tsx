import { useState } from 'react';

/**
 * The same model, but the idle auto-rotate stops and holds a static angle under
 * prefers-reduced-motion (both the real OS setting and the simulate toggle). The scene
 * stays interactive on demand — a user who drags to orbit is initiating that motion.
 */
export function AmbientMotionReducedGood() {
  const [reduce, setReduce] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <style>{`
        @keyframes amr-spin-good { to { transform: rotateY(360deg); } }
        .amr-cube-good { animation: amr-spin-good 5s linear infinite; }
        .amr-cube-good.amr-reduced { animation: none; transform: rotateY(-20deg); }
        @media (prefers-reduced-motion: reduce) {
          .amr-cube-good { animation: none; transform: rotateY(-20deg); }
        }
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
          <div
            className={`amr-cube-good ${reduce ? 'amr-reduced' : ''} grid size-20 place-items-center rounded-lg bg-primary font-semibold text-primary-foreground`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            3D
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-success">
        Toggle reduced motion — the idle spin stops and holds. Interaction (drag-to-orbit) would still be allowed.
      </p>
    </div>
  );
}
