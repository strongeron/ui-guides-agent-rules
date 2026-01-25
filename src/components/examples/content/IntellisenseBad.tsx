export function IntellisenseBad() {
  // BAD: Code written without Tailwind IntelliSense - contains typos and invalid classes
  // These classes won't work but there's no warning without IntelliSense
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Code With Typos (No IntelliSense)</h4>
        <div className="space-y-4">
          {/* BAD: Intentional typos that IntelliSense would catch */}
          <div className="p-3 bg-muted rounded-lg">
            <h5 className="text-sm font-medium mb-2">Typo in Color</h5>
            <div className="bg-background rounded p-2 text-xs font-mono">
              <code className="text-error line-through">bg-primry</code>
              <span className="text-muted-foreground ml-2">(should be bg-primary)</span>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h5 className="text-sm font-medium mb-2">Invalid Spacing Value</h5>
            <div className="bg-background rounded p-2 text-xs font-mono">
              <code className="text-error line-through">p-7</code>
              <span className="text-muted-foreground ml-2">(not in default scale)</span>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h5 className="text-sm font-medium mb-2">Made-up Class</h5>
            <div className="bg-background rounded p-2 text-xs font-mono">
              <code className="text-error line-through">text-semibold</code>
              <span className="text-muted-foreground ml-2">(should be font-semibold)</span>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h5 className="text-sm font-medium mb-2">Wrong Syntax</h5>
            <div className="bg-background rounded p-2 text-xs font-mono">
              <code className="text-error line-through">hover-bg-blue-500</code>
              <span className="text-muted-foreground ml-2">(should be hover:bg-blue-500)</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-error">
        Without IntelliSense, typos silently fail - no autocomplete or validation
      </p>
    </div>
  );
}
