export function TextRenderingBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3" style={{ textRendering: 'auto' }}>
        <h3 className="text-2xl font-bold tracking-tight text-foreground">AVAWATTY</h3>
        <h3 className="text-2xl font-bold tracking-tight text-foreground">Typography Matters</h3>
        <p className="text-sm text-muted-foreground">Notice the spacing between letter pairs like AV, WA, TT, and Ty.</p>
      </div>
      <p className="text-xs text-error">Default text rendering — poor kerning on letter pairs</p>
    </div>
  );
}
