export function FontSubsettingBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-medium text-foreground">Font Loading</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Inter-Regular.woff2</span>
            <span className="text-foreground font-mono">312 KB</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-destructive h-2 rounded-full" style={{ width: '100%' }} />
          </div>
          <p className="text-xs text-muted-foreground">Full font file with all 2,600+ glyphs including Cyrillic, Greek, Vietnamese…</p>
        </div>
        <div className="text-xs text-muted-foreground">Characters used on page: ~80 (Latin only)</div>
      </div>
      <p className="text-xs text-error">Full font file downloaded — wasted bandwidth on unused glyphs</p>
    </div>
  );
}
