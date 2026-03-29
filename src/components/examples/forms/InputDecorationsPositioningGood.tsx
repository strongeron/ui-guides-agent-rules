export function InputDecorationsPositioningGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-9 pr-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          $
        </span>
        <input
          type="text"
          placeholder="0.00"
          className="w-full pl-8 pr-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <p className="text-xs text-success">
        Icons positioned inside input — click anywhere to focus
      </p>
    </div>
  );
}
