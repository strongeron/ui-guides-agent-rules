export function NestedRadiiGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      {/* outer 24px (rounded-3xl) − 12px padding (p-3) = 12px inner (rounded-xl) */}
      <div className="p-3 bg-primary/15 rounded-3xl">
        <div className="rounded-xl bg-card border border-border p-4">
          <p className="text-sm font-medium text-foreground">Concentric corners</p>
          <p className="text-xs text-muted-foreground mt-1">
            The inner curve runs parallel to the outer one at every point.
          </p>
        </div>
      </div>
      <p className="text-xs text-success">
        inner = outer − padding → 24px − 12px = 12px. Curves stay concentric.
      </p>
    </div>
  );
}
