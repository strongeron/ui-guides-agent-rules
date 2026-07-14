export function ImpeccableGradientTextBad() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-card p-4">
        <h2 className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent">
          Ship faster with confidence
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Try selecting the headline above.</p>

        <p className="mt-3 text-xs font-medium text-muted-foreground">Selected:</p>
        <h2 className="mt-1 inline-block bg-fuchsia-500/40 bg-clip-text text-2xl font-bold text-transparent">
          Ship faster with confidence
        </h2>
      </div>

      <p className="text-xs text-error">
        The gradient is painted as the background and clipped to the glyphs, so the text itself is
        transparent. Select it and the selection highlight paints behind nothing — the words vanish.
        Forced-colors mode drops the background too, leaving an invisible headline.
      </p>
    </div>
  );
}
