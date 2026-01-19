export function NoTransitionAllGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex gap-4 justify-center">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:scale-105 transition-transform duration-200">
          Scale only
        </button>
        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-80 transition-opacity duration-200">
          Opacity only
        </button>
      </div>
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-2">Explicit Transitions</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <code className="text-xs bg-muted px-1 rounded">transition-transform</code>
            <span className="text-muted-foreground">- scale, rotate, translate</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-muted px-1 rounded">transition-opacity</code>
            <span className="text-muted-foreground">- fade effects</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-muted px-1 rounded">transition-colors</code>
            <span className="text-muted-foreground">- color changes</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-success">
        Explicit transitions are predictable and performant
      </p>
    </div>
  );
}
