export function VideoAutoplayPerformanceBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-muted rounded aspect-video flex items-center justify-center relative">
            <span className="text-xs text-muted-foreground">Video {i}</span>
            <span className="absolute top-1 right-1 text-[10px] bg-destructive text-white px-1 rounded">▶ Playing</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-error">All 4 videos autoplay simultaneously — chokes iOS devices</p>
    </div>
  );
}
