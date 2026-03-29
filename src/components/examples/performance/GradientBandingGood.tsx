export function GradientBandingGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="relative h-32 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-primary/60 via-primary/30 to-transparent" style={{ background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.6), hsl(var(--primary) / 0.3) 50%, transparent)' }} />
          <div className="relative z-10 flex items-center justify-center h-full">
            <span className="text-sm font-medium text-foreground">Hero Section</span>
          </div>
        </div>
        <pre className="text-xs bg-muted rounded p-2 mt-3 text-foreground overflow-x-auto"><code>{`background: radial-gradient(...)
/* No blur or scale needed */`}</code></pre>
      </div>
      <p className="text-xs text-success">Radial gradient — smooth colors, no banding artifacts</p>
    </div>
  );
}
