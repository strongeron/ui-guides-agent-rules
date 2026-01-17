export function CrispBordersBad() {
  return (
    <div className="w-full max-w-sm">
      <div
        className="bg-card rounded-lg p-4"
        style={{
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
        }}
      >
        <h3 className="text-lg font-semibold mb-2">Card with Shadow</h3>
        <p className="text-sm text-muted-foreground">
          Shadow without border can look muddy and lacks definition at the edges.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Shadow alone creates soft, unclear edges
      </p>
    </div>
  );
}
