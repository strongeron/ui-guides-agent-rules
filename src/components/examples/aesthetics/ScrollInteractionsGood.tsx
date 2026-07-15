import { useRef, useState } from 'react';

const features = [
  { title: 'Lightning Fast', description: 'Built for speed with optimized performance' },
  { title: 'Secure by Default', description: 'Enterprise-grade security out of the box' },
  { title: 'Scale Infinitely', description: 'Grow without limits or constraints' },
  { title: 'Always Available', description: 'Uptime you can plan a business around' },
];

export function ScrollInteractionsGood() {
  const [added, setAdded] = useState(false);
  const [nonce, setNonce] = useState(0); // remounts the row so the entrance replays each time
  const listRef = useRef<HTMLDivElement>(null);

  const ship = () => {
    if (added) {
      setAdded(false);
      return;
    }
    setAdded(true);
    setNonce((n) => n + 1);
    // Bring the new row into view so its one animation is actually seen.
    requestAnimationFrame(() => {
      if (listRef.current) listRef.current.scrollTop = 0;
    });
  };

  return (
    <div className="w-full max-w-md p-6 bg-card rounded-lg">
      <style>{`
        @keyframes scroll-good-in {
          from { opacity: 0; transform: translateY(18px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .scroll-good-row { animation: scroll-good-in 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
        }
      `}</style>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Features</h3>
        <button
          onClick={ship}
          className="px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm motion-safe:transition-colors hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          {added ? 'Remove' : 'Ship a feature'}
        </button>
      </div>

      <div ref={listRef} className="space-y-3 max-h-64 overflow-y-auto pr-2">
        {/* The one animated element: it moves because something actually changed. */}
        {added && (
          <div
            key={nonce}
            className="scroll-good-row p-4 bg-muted rounded-lg border border-primary"
          >
            <h4 className="font-medium text-foreground">Audit Log</h4>
            <p className="text-sm text-muted-foreground mt-1">Just added to your plan</p>
          </div>
        )}

        {/* The list itself does not perform. It is simply there when you scroll to it. */}
        {features.map((feature) => (
          <div key={feature.title} className="p-4 bg-muted rounded-lg border border-border">
            <h4 className="font-medium text-foreground">{feature.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-success mt-4">
        Press <span className="font-medium">Ship a feature</span>: motion is spent once, on the row that genuinely
        arrived &mdash; no reveal-on-scroll, no hover lift, no pulsing heading. When something moves here, it means
        something moved.
      </p>
    </div>
  );
}
