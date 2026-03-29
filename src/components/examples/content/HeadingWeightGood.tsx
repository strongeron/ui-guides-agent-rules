export function HeadingWeightGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Section Title</h2>
        <h3 className="text-lg font-medium text-foreground">Subsection Title</h3>
        <p className="text-sm text-muted-foreground">Content below the headings feels balanced and connected with the appropriate weight titles above.</p>
      </div>
      <p className="text-xs text-success">Font weight 500-600 for medium headings — balanced hierarchy</p>
    </div>
  );
}
