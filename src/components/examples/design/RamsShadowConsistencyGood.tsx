export function RamsShadowConsistencyGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Consistent Shadow System</h4>
        <div className="space-y-4 p-4 bg-muted rounded-lg">
          <div className="p-3 bg-background rounded-lg shadow-sm">
            <p className="text-sm font-medium">Card Level</p>
            <p className="text-xs text-muted-foreground">shadow-sm - subtle lift</p>
          </div>
          <div className="p-3 bg-background rounded-lg shadow-md">
            <p className="text-sm font-medium">Dropdown Level</p>
            <p className="text-xs text-muted-foreground">shadow-md - floating</p>
          </div>
          <div className="p-3 bg-background rounded-lg shadow-lg">
            <p className="text-sm font-medium">Modal Level</p>
            <p className="text-xs text-muted-foreground">shadow-lg - prominent</p>
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code>shadow-sm → shadow-md → shadow-lg progression</code>
        </div>
      </div>
      <p className="text-xs text-success">
        Clear elevation hierarchy through consistent shadows
      </p>
    </div>
  );
}
