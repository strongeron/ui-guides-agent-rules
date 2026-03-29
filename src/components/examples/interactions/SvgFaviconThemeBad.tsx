export function SvgFaviconThemeBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-foreground rounded flex items-center justify-center">
            <span className="text-background text-xs font-bold">A</span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">favicon.png</p>
            <p className="text-xs text-muted-foreground">Static raster — same in light & dark</p>
          </div>
        </div>
        <pre className="text-xs bg-muted rounded p-2 text-foreground overflow-x-auto"><code>{`<link rel="icon" href="/favicon.png" />`}</code></pre>
      </div>
      <p className="text-xs text-error">PNG favicon can't adapt to system dark/light mode</p>
    </div>
  );
}
