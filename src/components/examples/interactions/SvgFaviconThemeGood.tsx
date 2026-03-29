export function SvgFaviconThemeGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white border border-border rounded flex items-center justify-center">
              <span className="text-black text-xs font-bold">A</span>
            </div>
            <span className="text-xs text-muted-foreground">Light</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black border border-border rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="text-xs text-muted-foreground">Dark</span>
          </div>
        </div>
        <pre className="text-xs bg-muted rounded p-2 text-foreground overflow-x-auto"><code>{`<svg>
  <style>
    path { fill: #000 }
    @media (prefers-color-scheme: dark) {
      path { fill: #fff }
    }
  </style>
</svg>`}</code></pre>
      </div>
      <p className="text-xs text-success">SVG favicon with prefers-color-scheme — adapts to theme</p>
    </div>
  );
}
