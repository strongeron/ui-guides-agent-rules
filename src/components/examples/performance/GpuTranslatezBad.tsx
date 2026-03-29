export function GpuTranslateZBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <style>{`
          .force-gpu-all * {
            transform: translateZ(0);
          }
        `}</style>
        <div className="force-gpu-all space-y-2">
          <div className="p-2 bg-muted rounded text-sm text-foreground">Static text element</div>
          <div className="p-2 bg-muted rounded text-sm text-foreground">Another static element</div>
          <div className="p-2 bg-muted rounded text-sm text-foreground">Yet another element</div>
          <div className="p-2 bg-muted rounded text-sm text-foreground">No animation here</div>
        </div>
        <code className="text-xs bg-muted px-2 py-1 rounded text-foreground block">* {'{'} transform: translateZ(0) {'}'}</code>
      </div>
      <p className="text-xs text-error">Forcing GPU on all elements — wastes memory, can hurt performance</p>
    </div>
  );
}
