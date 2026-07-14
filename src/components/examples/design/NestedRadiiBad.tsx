export function NestedRadiiBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      {/* Inner radius reuses the outer 24px despite the 12px inset — the curves diverge. */}
      <div className="p-3 bg-destructive/15 rounded-3xl">
        <div className="rounded-3xl bg-card border border-border p-4">
          <p className="text-sm font-medium text-foreground">Divergent corners</p>
          <p className="text-xs text-muted-foreground mt-1">
            The inner curve is too round for its inset — the gap pinches at each corner.
          </p>
        </div>
      </div>
      <p className="text-xs text-error">
        Inner radius copies the outer (24px) while inset 12px — corners are not concentric.
      </p>
    </div>
  );
}
