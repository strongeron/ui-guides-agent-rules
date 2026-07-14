export function ImpeccableGradientTextGood() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-card p-4">
        <h2 className="text-2xl font-bold text-foreground">
          Ship <span className="font-extrabold text-primary">faster</span> with confidence
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Try selecting the headline above.</p>

        <p className="mt-3 text-xs font-medium text-muted-foreground">Selected:</p>
        <h2 className="mt-1 inline-block bg-primary/25 text-2xl font-bold text-foreground">
          Ship <span className="font-extrabold text-primary">faster</span> with confidence
        </h2>
      </div>

      <p className="text-xs text-success">
        One solid color, with emphasis carried by weight and size. Selection highlights it, forced-colors
        mode maps it to a system color, and copy/paste still shows real text on any background.
      </p>
    </div>
  );
}
