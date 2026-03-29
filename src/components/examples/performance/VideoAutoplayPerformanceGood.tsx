export function VideoAutoplayPerformanceGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-muted rounded aspect-video flex items-center justify-center relative">
            <span className="text-xs text-muted-foreground">Video {i}</span>
            {i === 1 ? (
              <span className="absolute top-1 right-1 text-[10px] bg-primary text-primary-foreground px-1 rounded">▶ Visible</span>
            ) : (
              <span className="absolute top-1 right-1 text-[10px] bg-muted-foreground/50 text-background px-1 rounded">⏸ Paused</span>
            )}
          </div>
        ))}
        <code className="text-xs bg-muted px-2 py-1 rounded text-foreground block">IntersectionObserver → pause off-screen</code>
      </div>
      <p className="text-xs text-success">Only visible video plays — off-screen videos paused/unmounted</p>
    </div>
  );
}
