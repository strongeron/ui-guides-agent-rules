export function ClassFormattingBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Random Class Order</h4>
        <div className="flex flex-col gap-4 rounded-lg bg-muted p-4 text-sm font-mono">
          <div className="space-y-1">
            <span className="text-xs text-error">/* Mixed, no pattern */</span>
            <code className="block text-error">hover:bg-primary/90 px-4 flex</code>
          </div>
          <div className="space-y-1">
            <code className="block text-error">text-white h-12 items-center</code>
          </div>
          <div className="space-y-1">
            <code className="block text-error">bg-primary py-2 w-full</code>
          </div>
          <div className="space-y-1">
            <code className="block text-error">rounded-lg font-medium text-sm</code>
          </div>
          <div className="space-y-1">
            <code className="block text-error">justify-between</code>
          </div>
        </div>
        <div className="mt-4 p-2 border border-error/30 rounded text-xs text-error">
          Same classes as Good example, but impossible to scan!
        </div>
      </div>
      <p className="text-xs text-error">
        Random order makes it hard to find or spot duplicate classes
      </p>
    </div>
  );
}
