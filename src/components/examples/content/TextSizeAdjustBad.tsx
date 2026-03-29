export function TextSizeAdjustBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-2">
        <h3 className="text-sm font-medium text-foreground">iOS Landscape Issue</h3>
        <p className="text-sm text-muted-foreground" style={{ WebkitTextSizeAdjust: 'auto' } as React.CSSProperties}>
          When rotating to landscape on iOS, the browser may auto-inflate text size to improve readability. This can break your carefully crafted layouts and make text inconsistently sized.
        </p>
        <code className="text-xs bg-muted px-2 py-1 rounded text-foreground inline-block">
          -webkit-text-size-adjust: auto
        </code>
      </div>
      <p className="text-xs text-error">Text may resize unexpectedly in landscape on iOS</p>
    </div>
  );
}
