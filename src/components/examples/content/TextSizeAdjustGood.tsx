export function TextSizeAdjustGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-2">
        <h3 className="text-sm font-medium text-foreground">iOS Landscape Fixed</h3>
        <p className="text-sm text-muted-foreground" style={{ WebkitTextSizeAdjust: '100%' } as React.CSSProperties}>
          Setting text-size-adjust to 100% prevents the browser from inflating text when rotating to landscape. Your layouts remain consistent across orientations.
        </p>
        <code className="text-xs bg-muted px-2 py-1 rounded text-foreground inline-block">
          -webkit-text-size-adjust: 100%
        </code>
      </div>
      <p className="text-xs text-success">Consistent text size across orientations</p>
    </div>
  );
}
