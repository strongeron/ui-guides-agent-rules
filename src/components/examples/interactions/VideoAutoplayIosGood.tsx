export function VideoAutoplayIOSGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
          <span className="text-success text-xs">✓ Video autoplays on iOS</span>
        </div>
        <pre className="text-xs bg-muted rounded p-2 text-foreground overflow-x-auto"><code>{`<video autoPlay loop muted playsInline>
  <source src="hero.mp4" />
</video>`}</code></pre>
      </div>
      <p className="text-xs text-success">muted + playsInline enables autoplay on iOS Safari</p>
    </div>
  );
}
