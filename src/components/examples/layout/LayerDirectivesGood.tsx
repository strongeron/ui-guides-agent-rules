export function LayerDirectivesGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Using @layer Directives</h4>
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-3">
            <h5 className="text-sm font-medium mb-2">@layer base</h5>
            <div className="font-mono text-xs bg-background rounded p-2">
              <pre className="text-foreground">{`@layer base {
  h1 { @apply text-2xl font-bold; }
}`}</pre>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Reset & element defaults</p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <h5 className="text-sm font-medium mb-2">@layer components</h5>
            <div className="font-mono text-xs bg-background rounded p-2">
              <pre className="text-foreground">{`@layer components {
  .btn { @apply px-4 py-2 rounded; }
}`}</pre>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Reusable component classes</p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <h5 className="text-sm font-medium mb-2">@layer utilities</h5>
            <div className="font-mono text-xs bg-background rounded p-2">
              <pre className="text-foreground">{`@layer utilities {
  .text-balance { text-wrap: balance; }
}`}</pre>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Custom utilities</p>
          </div>
        </div>
      </div>
      <p className="text-xs text-success">
        @layer integrates custom CSS with Tailwind's specificity cascade
      </p>
    </div>
  );
}
