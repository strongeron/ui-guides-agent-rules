export function IbelickZIndexScaleBad() {
  return (
    <div className="relative h-48 w-full bg-muted/50 rounded-lg overflow-hidden">
      {/* Arbitrary z-index values - z-index wars! */}
      <div className="absolute inset-x-4 top-4 p-3 bg-card rounded-lg shadow-md z-[10]">
        <span className="text-sm">Card (z-[10])</span>
      </div>
      <div className="absolute left-8 top-12 p-2 bg-primary text-primary-foreground rounded z-[100]">
        <span className="text-xs">Dropdown (z-[100])</span>
      </div>
      <div className="absolute right-8 top-8 p-2 bg-destructive text-white rounded z-[999]">
        <span className="text-xs">Modal (z-[999])</span>
      </div>
      <div className="absolute right-4 bottom-4 p-2 bg-muted-foreground text-background rounded z-[9999]">
        <span className="text-xs">Tooltip (z-[9999])</span>
      </div>
      <p className="absolute bottom-2 left-4 text-xs text-destructive">
        Arbitrary z-indexes lead to unpredictable stacking
      </p>
    </div>
  );
}
