const BARS = [40, 55, 35, 70, 90];

export function IllustrationLabelBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <div className="flex items-end gap-2 h-24">
          {BARS.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-primary/60"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="p-2 bg-muted rounded text-xs text-error space-y-0.5 font-mono">
          <p className="text-foreground font-sans font-medium">Screen reader</p>
          <p>group … group … group … group … group … group</p>
        </div>
      </div>
      <p className="text-xs text-error">
        The illustration is a stack of divs, so it is announced element by
        element — six meaningless nodes and not one number
      </p>
    </div>
  );
}
