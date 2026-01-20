export function IbelickZIndexScaleGood() {
  // Semantic z-index scale:
  // z-0: base content
  // z-10: dropdowns, floating elements
  // z-20: sticky headers
  // z-30: fixed elements
  // z-40: modals, dialogs
  // z-50: tooltips, popovers

  return (
    <div className="relative h-48 w-full bg-muted/50 rounded-lg overflow-hidden">
      {/* Semantic z-index scale */}
      <div className="absolute inset-x-4 top-4 p-3 bg-card rounded-lg shadow-md z-0">
        <span className="text-sm">Card (z-0 base)</span>
      </div>
      <div className="absolute left-8 top-12 p-2 bg-primary text-primary-foreground rounded z-10">
        <span className="text-xs">Dropdown (z-10)</span>
      </div>
      <div className="absolute right-8 top-8 p-2 bg-destructive text-white rounded z-40">
        <span className="text-xs">Modal (z-40)</span>
      </div>
      <div className="absolute right-4 bottom-4 p-2 bg-muted-foreground text-background rounded z-50">
        <span className="text-xs">Tooltip (z-50)</span>
      </div>
      <p className="absolute bottom-2 left-4 text-xs text-success">
        Semantic scale: base → dropdown → modal → tooltip
      </p>
    </div>
  );
}
