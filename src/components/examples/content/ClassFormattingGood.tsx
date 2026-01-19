export function ClassFormattingGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Organized Class Order</h4>
        <div className="flex flex-col gap-4 rounded-lg bg-muted p-4 text-sm font-mono">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">/* Layout */</span>
            <code className="block">flex items-center justify-between</code>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">/* Sizing */</span>
            <code className="block">w-full h-12</code>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">/* Spacing */</span>
            <code className="block">px-4 py-2</code>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">/* Typography */</span>
            <code className="block">text-sm font-medium</code>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">/* Colors & Effects */</span>
            <code className="block">bg-primary text-white rounded-lg</code>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">/* Variants */</span>
            <code className="block">hover:bg-primary/90</code>
          </div>
        </div>
      </div>
      <p className="text-xs text-success">
        Consistent order makes classes scannable and maintainable
      </p>
    </div>
  );
}
