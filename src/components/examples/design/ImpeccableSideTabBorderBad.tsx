const CALLOUTS = [
  { title: 'Deploy succeeded', body: 'Build 1284 is live in production.', stripe: 'border-l-emerald-500' },
  { title: 'Usage at 82%', body: 'You are approaching the plan limit.', stripe: 'border-l-amber-500' },
  { title: 'Payment failed', body: 'Update the card on file to continue.', stripe: 'border-l-violet-500' },
];

export function ImpeccableSideTabBorderBad() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Status callouts</p>

      <div className="space-y-2">
        {CALLOUTS.map((c) => (
          <div
            key={c.title}
            className={`rounded-lg border-l-4 ${c.stripe} bg-card px-4 py-3`}
          >
            <p className="text-sm font-medium text-foreground">{c.title}</p>
            <p className="text-xs text-muted-foreground">{c.body}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-error">
        A 4px colored stripe on one side of a rounded card, with no border anywhere else. Detector: one
        side {'≥'} 2px while the others are {'≤'} 1px, the color is non-neutral, and the width is{' '}
        {'≥'} 3px or the corners are rounded. The status is carried by hue alone.
      </p>
    </div>
  );
}
