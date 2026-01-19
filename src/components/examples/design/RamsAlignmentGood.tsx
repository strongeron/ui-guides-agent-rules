export function RamsAlignmentGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Consistent Alignment</h4>
        <div className="space-y-3 p-4 bg-muted rounded-lg">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-background rounded-lg border border-border">
              <p className="text-sm font-medium">Card A</p>
              <p className="text-xs text-muted-foreground">Description</p>
            </div>
            <div className="p-3 bg-background rounded-lg border border-border">
              <p className="text-sm font-medium">Card B</p>
              <p className="text-xs text-muted-foreground">Description</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-background rounded">
              <span className="text-sm">Item One</span>
              <span className="text-sm font-medium">$10</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-background rounded">
              <span className="text-sm">Item Two</span>
              <span className="text-sm font-medium">$20</span>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code>grid-cols-2, flex justify-between items-center</code>
        </div>
      </div>
      <p className="text-xs text-success">
        Elements align to grid - clean and organized
      </p>
    </div>
  );
}
