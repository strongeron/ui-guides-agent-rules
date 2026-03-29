export function InputDecorationsPositioningBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">🔍</span>
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 px-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">$</span>
        <input
          type="text"
          placeholder="0.00"
          className="flex-1 px-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <p className="text-xs text-error">
        Clicking the icon doesn't focus the input, decoration is separate
      </p>
    </div>
  );
}
