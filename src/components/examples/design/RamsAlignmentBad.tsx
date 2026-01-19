export function RamsAlignmentBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Poor Alignment</h4>
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex gap-3 mb-3">
            <div className="p-3 bg-background rounded-lg border border-border w-[45%]">
              <p className="text-sm font-medium">Card A</p>
              <p className="text-xs text-muted-foreground">Description</p>
            </div>
            <div className="p-3 bg-background rounded-lg border border-border w-[40%]">
              <p className="text-sm font-medium">Card B</p>
              <p className="text-xs text-muted-foreground">Description</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center p-2 bg-background rounded ml-2">
              <span className="text-sm">Item One</span>
              <span className="text-sm font-medium ml-auto mr-4">$10</span>
            </div>
            <div className="flex items-center p-2 bg-background rounded">
              <span className="text-sm pl-3">Item Two</span>
              <span className="text-sm font-medium ml-auto">$20</span>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code className="text-error">Unequal widths, inconsistent margins</code>
        </div>
      </div>
      <p className="text-xs text-error">
        Misaligned elements - looks unpolished
      </p>
    </div>
  );
}
