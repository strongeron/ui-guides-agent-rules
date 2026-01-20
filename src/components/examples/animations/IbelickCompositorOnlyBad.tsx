export function IbelickCompositorOnlyBad() {
  return (
    <div className="space-y-4">
      <div className="relative h-20 bg-muted rounded-lg overflow-hidden">
        <div
          className="absolute bg-primary text-primary-foreground px-4 py-2 rounded"
          style={{
            animation: 'slideLeftBad 2s infinite',
          }}
        >
          Moving Box
        </div>
      </div>
      <style>{`
        @keyframes slideLeftBad {
          0% { left: 0; top: 20px; }
          50% { left: calc(100% - 120px); top: 40px; }
          100% { left: 0; top: 20px; }
        }
      `}</style>
      <p className="text-xs text-destructive">
        Animating left/top triggers layout on every frame - causes jank
      </p>
    </div>
  );
}
