export function CrispBordersGood() {
  return (
    <div className="w-full max-w-sm">
      <div
        className="bg-card rounded-lg p-4"
        style={{
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
        }}
      >
        <h3 className="text-lg font-semibold mb-2">Card with Border</h3>
        <p className="text-sm text-muted-foreground">
          Subtle border combined with shadow creates crisp, well-defined edges that look professional.
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        Semi-transparent border adds crisp definition
      </p>
    </div>
  );
}
