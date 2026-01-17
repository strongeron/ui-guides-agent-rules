export function PreloadFontsGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Custom Font Heading</h3>
        <p className="text-sm text-muted-foreground mb-3">
          With font preloading via &lt;link rel="preload"&gt;, fonts load early and text renders immediately with the correct typeface.
        </p>
        <code className="text-xs bg-muted px-2 py-1 rounded block">
          &lt;link rel="preload" href="font.woff2" as="font" crossorigin&gt;
        </code>
      </div>
      <p className="text-xs text-green-700 mt-4">
        Preload eliminates FOUT/FOIT and layout shift
      </p>
    </div>
  );
}
