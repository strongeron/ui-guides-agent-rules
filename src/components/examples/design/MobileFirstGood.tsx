export function MobileFirstGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Mobile-First Layout</h4>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 p-4 bg-primary/10 rounded-lg text-center">
            <span className="text-sm font-medium">Card 1</span>
          </div>
          <div className="flex-1 p-4 bg-primary/10 rounded-lg text-center">
            <span className="text-sm font-medium">Card 2</span>
          </div>
        </div>
        <div className="mt-4 bg-muted rounded p-3 font-mono text-xs">
          <code>flex flex-col md:flex-row</code>
        </div>
      </div>
      <div className="text-sm text-muted-foreground space-y-1">
        <p><strong>Mobile:</strong> Stacked (flex-col)</p>
        <p><strong>md+:</strong> Side by side (flex-row)</p>
      </div>
      <p className="text-xs text-success">
        Base styles for mobile, breakpoints enhance for larger screens
      </p>
    </div>
  );
}
