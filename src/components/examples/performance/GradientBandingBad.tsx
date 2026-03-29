export function GradientBandingBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="relative h-32 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-primary/80" style={{ filter: 'blur(40px)', transform: 'scale(1.5)' }} />
          <div className="relative z-10 flex items-center justify-center h-full">
            <span className="text-sm font-medium text-primary-foreground">Hero Section</span>
          </div>
        </div>
        <pre className="text-xs bg-muted rounded p-2 mt-3 text-foreground overflow-x-auto"><code>{`background: solid color
filter: blur(40px)
transform: scale(1.5)`}</code></pre>
      </div>
      <p className="text-xs text-error">Scaling + blurring solid rectangle — visible color banding</p>
    </div>
  );
}
