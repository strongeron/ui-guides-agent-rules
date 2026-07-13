export function PauseOffscreenBad() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Scroll inside the box — the spinner keeps running when hidden.</p>
      <div className="h-32 overflow-y-auto rounded-lg border border-border p-3">
        <div className="h-28" />
        <div className="flex items-center gap-2 py-2">
          <span
            className="inline-block size-6 rounded-full border-4 border-primary border-t-transparent"
            style={{ animation: 'pauseSpin 1s linear infinite' }}
          />
          <span className="text-xs">always running</span>
        </div>
        <div className="h-28" />
      </div>
      <style>{`@keyframes pauseSpin { to { transform: rotate(360deg); } }`}</style>
      <p className="text-xs text-destructive">
        The spinner keeps animating even when scrolled out of view — wasted CPU and battery
      </p>
    </div>
  );
}
