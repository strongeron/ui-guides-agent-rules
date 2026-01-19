export function IntellisenseGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">With IntelliSense</h4>
        <div className="space-y-4">
          <div className="p-3 bg-muted rounded-lg">
            <h5 className="text-sm font-medium mb-2">Autocomplete</h5>
            <div className="bg-background rounded p-2 text-xs font-mono">
              <span className="text-muted-foreground">className="</span>
              <span className="text-primary">bg-</span>
              <span className="text-muted-foreground">|"</span>
              <div className="mt-2 border border-border rounded p-2 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-primary" />
                  <span>bg-primary</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-secondary" />
                  <span>bg-secondary</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-muted" />
                  <span>bg-muted</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h5 className="text-sm font-medium mb-2">Hover Preview</h5>
            <div className="bg-background rounded p-2 text-xs font-mono">
              <code>p-4</code>
              <span className="text-muted-foreground"> → padding: 1rem;</span>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h5 className="text-sm font-medium mb-2">Error Detection</h5>
            <div className="bg-background rounded p-2 text-xs font-mono">
              <span className="underline decoration-wavy decoration-error">bg-primar</span>
              <span className="text-error ml-2">Unknown class</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-success">
        IntelliSense catches errors and boosts productivity
      </p>
    </div>
  );
}
