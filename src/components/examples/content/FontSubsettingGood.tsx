export function FontSubsettingGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-medium text-foreground">Font Loading</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Inter-Regular-Latin.woff2</span>
            <span className="text-foreground font-mono">24 KB</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '8%' }} />
          </div>
          <p className="text-xs text-muted-foreground">Subset font with only Latin glyphs needed for the page content.</p>
        </div>
        <code className="text-xs bg-muted px-2 py-1 rounded text-foreground block">
          unicode-range: U+0000-00FF, U+0131, U+0152-0153;
        </code>
      </div>
      <p className="text-xs text-success">Font subset — 92% smaller, only needed glyphs</p>
    </div>
  );
}
