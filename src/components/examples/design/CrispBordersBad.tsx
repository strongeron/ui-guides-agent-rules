export function CrispBordersBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-2">Card with Shadow Only</h3>
        <p className="text-sm text-muted-foreground">
          Shadow without border can look muddy and lacks definition at the edges.
        </p>
      </div>
      <p className="text-xs text-error mt-4">
        Shadow alone creates soft, unclear edges
      </p>
    </div>
  );
}
