const CALLOUTS = [
  { title: 'Deploy succeeded', body: 'Build 1284 is live in production.', icon: '✓', tone: 'text-success' },
  { title: 'Usage at 82%', body: 'You are approaching the plan limit.', icon: '△', tone: 'text-muted-foreground' },
  { title: 'Payment failed', body: 'Update the card on file to continue.', icon: '✕', tone: 'text-error' },
];

export function ImpeccableSideTabBorderGood() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Status callouts</p>

      <div className="space-y-2">
        {CALLOUTS.map((c) => (
          <div
            key={c.title}
            className="flex items-start gap-3 rounded-lg border border-border bg-muted px-4 py-3"
          >
            <span aria-hidden="true" className={`mt-0.5 text-sm leading-none ${c.tone}`}>
              {c.icon}
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">
                <span className={`${c.tone} font-semibold`}>{c.title}</span>
              </p>
              <p className="text-xs text-muted-foreground">{c.body}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-success">
        One even 1px border on all four sides, a tinted surface for separation, and a leading icon plus a
        worded status so the meaning survives without color. Nothing here trips the side-stripe detector.
      </p>
    </div>
  );
}
