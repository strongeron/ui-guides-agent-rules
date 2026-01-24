export function SpatialCompositionBad() {
  return (
    <div className="w-full max-w-md p-6 bg-card rounded-lg">
      <div className="grid grid-cols-3 gap-4">
        <div className="aspect-square bg-muted rounded flex items-center justify-center text-xs">
          Card 1
        </div>
        <div className="aspect-square bg-muted rounded flex items-center justify-center text-xs">
          Card 2
        </div>
        <div className="aspect-square bg-muted rounded flex items-center justify-center text-xs">
          Card 3
        </div>
        <div className="aspect-square bg-muted rounded flex items-center justify-center text-xs">
          Card 4
        </div>
        <div className="aspect-square bg-muted rounded flex items-center justify-center text-xs">
          Card 5
        </div>
        <div className="aspect-square bg-muted rounded flex items-center justify-center text-xs">
          Card 6
        </div>
      </div>
      <p className="text-xs text-destructive mt-4">
        Predictable symmetric grid is safe but forgettable
      </p>
    </div>
  );
}
