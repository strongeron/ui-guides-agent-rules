export function MathSymbolGlyphsBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-2 rounded-lg border border-border bg-card p-4 font-mono text-sm text-foreground">
        <p>1920 x 1080</p>
        <p>-40°C</p>
        <p>(c) 2026 · Pro(TM) · Reg(R)</p>
      </div>
      <p className="mt-4 text-xs text-destructive">
        ASCII stand-ins: the letter x for ×, a hyphen for minus, (c)/(TM)/(R) for the marks.
      </p>
    </div>
  );
}
