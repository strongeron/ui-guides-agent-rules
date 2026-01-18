export function ResponsiveCoverageGood() {
  return (
    <div className="w-full max-w-4xl">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Dashboard</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-primary/10 rounded text-sm">Metric 1</div>
          <div className="p-4 bg-primary/10 rounded text-sm">Metric 2</div>
          <div className="p-4 bg-primary/10 rounded text-sm">Metric 3</div>
          <div className="p-4 bg-primary/10 rounded text-sm">Metric 4</div>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Responsive grid adapts to screen size
      </p>
    </div>
  );
}
