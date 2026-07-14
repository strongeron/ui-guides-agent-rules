const BARS = [40, 55, 35, 70, 90];

export function IllustrationLabelGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <div
          role="img"
          aria-label="Bar chart: weekly deploys rose from 12 to 27 over 5 weeks"
          className="flex items-end gap-2 h-24"
        >
          {BARS.map((h, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="flex-1 rounded-t bg-primary/60"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="p-2 bg-muted rounded text-xs text-success space-y-0.5 font-mono">
          <p className="text-foreground font-sans font-medium">Screen reader</p>
          <p>"Bar chart: weekly deploys rose from 12 to 27 over 5 weeks, image"</p>
        </div>
      </div>
      <p className="text-xs text-success">
        role="img" plus an aria-label collapses the DOM tree into one node that
        carries the meaning the picture conveys
      </p>
    </div>
  );
}
