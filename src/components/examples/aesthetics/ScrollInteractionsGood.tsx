import { useState } from 'react';

const features = [
  { title: 'Lightning Fast', description: 'Built for speed with optimized performance' },
  { title: 'Secure by Default', description: 'Enterprise-grade security out of the box' },
  { title: 'Scale Infinitely', description: 'Grow without limits or constraints' },
  { title: 'Always Available', description: 'Uptime you can plan a business around' },
];

export function ScrollInteractionsGood() {
  const [added, setAdded] = useState(false);

  return (
    <div className="w-full max-w-md p-6 bg-card rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Features</h3>
        <button
          onClick={() => setAdded((v) => !v)}
          className="px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm motion-safe:transition-colors hover:bg-primary/90"
        >
          {added ? 'Remove' : 'Ship a feature'}
        </button>
      </div>

      {/* The list does not perform. It is simply there when you scroll to it. */}
      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
        {features.map((feature) => (
          <div key={feature.title} className="p-4 bg-muted rounded-lg border border-border">
            <h4 className="font-medium text-foreground">{feature.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
          </div>
        ))}

        {/* The one animated element: it moves because something actually changed. */}
        {added && (
          <div className="p-4 bg-muted rounded-lg border border-primary motion-safe:animate-scale-in">
            <h4 className="font-medium text-foreground">Audit Log</h4>
            <p className="text-sm text-muted-foreground mt-1">Just added to your plan</p>
          </div>
        )}
      </div>

      <p className="text-xs text-success mt-4">
        No reveal-on-scroll, no hover lift, no pulsing heading. Motion is spent once, on the row that
        genuinely arrived &mdash; so when something moves here, it means something moved.
      </p>
    </div>
  );
}
