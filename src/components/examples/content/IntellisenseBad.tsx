export function IntellisenseBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Without IntelliSense</h4>
        <div className="space-y-4">
          <div className="p-3 bg-muted rounded-lg">
            <h5 className="text-sm font-medium mb-2">No Autocomplete</h5>
            <div className="bg-background rounded p-2 text-xs font-mono">
              <span className="text-muted-foreground">className="</span>
              <span>bg-</span>
              <span className="animate-pulse">|</span>
              <span className="text-muted-foreground">"</span>
              <p className="mt-2 text-error text-xs">
                What colors are available? Check docs...
              </p>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h5 className="text-sm font-medium mb-2">No Preview</h5>
            <div className="bg-background rounded p-2 text-xs font-mono">
              <code>p-4</code>
              <span className="text-muted-foreground"> → ???</span>
            </div>
            <p className="mt-1 text-xs text-error">Is this 16px? 1rem? 4px?</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h5 className="text-sm font-medium mb-2">Silent Typos</h5>
            <div className="bg-background rounded p-2 text-xs font-mono">
              <code>bg-primar</code>
              <span className="text-muted-foreground ml-2">No warning...</span>
            </div>
            <p className="mt-1 text-xs text-error">Typo only discovered at runtime</p>
          </div>
        </div>
      </div>
      <p className="text-xs text-error">
        Working without IntelliSense is error-prone and slow
      </p>
    </div>
  );
}
