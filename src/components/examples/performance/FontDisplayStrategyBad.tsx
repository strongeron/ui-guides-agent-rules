export function FontDisplayStrategyBad() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="space-y-4">
          {/* Simulating font loading without font-display: swap */}
          <div className="relative">
            <h2 className="text-xl font-bold text-transparent animate-pulse bg-muted">
              FOIT: Flash of Invisible Text
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Text is invisible while font downloads
            </p>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Without <code className="bg-muted px-1 rounded">font-display</code>,
              browsers hide text for up to 3 seconds while waiting for web fonts.
              Users see a blank page instead of content.
            </p>
          </div>

          <div className="bg-muted/50 p-3 rounded text-xs font-mono">
            <span className="text-muted-foreground">/* Missing font-display */</span>
            <br />
            @font-face {'{'}
            <br />
            &nbsp;&nbsp;font-family: 'CustomFont';
            <br />
            &nbsp;&nbsp;src: url('/font.woff2');
            <br />
            &nbsp;&nbsp;<span className="text-error">/* No font-display! */</span>
            <br />
            {'}'}
          </div>
        </div>
      </div>
      <div className="mt-4 p-3 bg-error/10 border border-error/30 rounded text-sm">
        <p className="font-medium text-error">Problems:</p>
        <ul className="text-xs text-error/80 mt-1 space-y-1 list-disc pl-4">
          <li>Text invisible during font download (FOIT)</li>
          <li>No preconnect to font origins</li>
          <li>No fallback font metrics matching</li>
          <li>Hurts LCP when text is the largest element</li>
        </ul>
      </div>
    </div>
  );
}
