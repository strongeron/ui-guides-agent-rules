export function SemanticColorsGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3">
        <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg">
          Primary Action
        </button>
        <button className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg">
          Secondary Action
        </button>
        <button className="w-full px-4 py-2 bg-destructive text-destructive-foreground rounded-lg">
          Destructive Action
        </button>
        <div className="p-3 bg-muted text-muted-foreground rounded-lg text-sm">
          Muted content area
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-3">
        <h5 className="text-sm font-medium mb-2">Semantic Classes Used:</h5>
        <ul className="text-xs space-y-1 text-muted-foreground">
          <li><code className="bg-muted px-1 rounded">bg-primary</code> - main action</li>
          <li><code className="bg-muted px-1 rounded">bg-destructive</code> - danger</li>
          <li><code className="bg-muted px-1 rounded">bg-muted</code> - subtle bg</li>
        </ul>
      </div>
      <p className="text-xs text-success">
        Semantic tokens adapt to themes and dark mode automatically
      </p>
    </div>
  );
}
