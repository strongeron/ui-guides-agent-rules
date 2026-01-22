export function FontDisplayStrategyGood() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="space-y-4">
          {/* Text visible immediately with system font */}
          <div className="relative">
            <h2 className="text-xl font-bold">
              Instant Text Visibility
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Fallback font shown immediately, swaps when loaded
            </p>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              With <code className="bg-muted px-1 rounded">font-display: swap</code>,
              text renders immediately with a fallback font, then swaps when the
              web font loads. Users see content right away.
            </p>
          </div>

          <div className="bg-muted/50 p-3 rounded text-xs font-mono">
            <span className="text-success">/* Optimized font loading */</span>
            <br />
            @font-face {'{'}
            <br />
            &nbsp;&nbsp;font-family: 'CustomFont';
            <br />
            &nbsp;&nbsp;src: url('/font.woff2');
            <br />
            &nbsp;&nbsp;<span className="text-success">font-display: swap;</span>
            <br />
            {'}'}
          </div>
        </div>
      </div>
      <div className="mt-4 p-3 bg-success/10 border border-success/30 rounded text-sm">
        <p className="font-medium text-success">Best Practices:</p>
        <ul className="text-xs text-success/80 mt-1 space-y-1 list-disc pl-4">
          <li><code>font-display: swap</code> shows text immediately</li>
          <li>Preconnect to font CDNs for faster loading</li>
          <li>Size-adjust on fallback minimizes CLS</li>
          <li>Preload critical fonts in document head</li>
        </ul>
      </div>
    </div>
  );
}
