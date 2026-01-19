export function SkipLinkTwGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 relative overflow-hidden">
        <h4 className="font-medium mb-3">Skip Link Demo</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Press Tab to reveal the skip link.
        </p>
        <div className="relative bg-muted rounded-lg p-4 min-h-[120px]">
          <a
            href="#demo-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-1.5 focus:bg-primary focus:text-primary-foreground focus:rounded focus:text-sm"
          >
            Skip to content
          </a>
          <nav className="flex gap-2 mb-4">
            <button className="px-2 py-1 text-xs bg-background rounded">Home</button>
            <button className="px-2 py-1 text-xs bg-background rounded">About</button>
            <button className="px-2 py-1 text-xs bg-background rounded">Contact</button>
          </nav>
          <div id="demo-content" className="text-sm text-muted-foreground">
            Main content area
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code>sr-only focus:not-sr-only</code>
        </div>
      </div>
      <p className="text-xs text-success">
        Skip link hidden until keyboard focus, then prominently displayed
      </p>
    </div>
  );
}
