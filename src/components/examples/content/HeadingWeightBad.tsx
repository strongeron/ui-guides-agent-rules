export function HeadingWeightBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-black text-foreground">Section Title</h2>
        <h3 className="text-lg font-extrabold text-foreground">Subsection Title</h3>
        <p className="text-sm text-muted-foreground">Content below the heavy headings feels disconnected from the overly bold titles above.</p>
      </div>
      <p className="text-xs text-error">Font weight 800-900 on headings — too heavy for medium-sized text</p>
    </div>
  );
}
