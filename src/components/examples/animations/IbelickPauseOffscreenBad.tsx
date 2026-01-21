export function IbelickPauseOffscreenBad() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
        <div
          className="size-8 border-4 border-primary border-t-transparent rounded-full"
          style={{ animation: 'spin 1s linear infinite' }}
        />
        <span className="text-sm">Loading data...</span>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <p className="text-xs text-destructive">
        Spinner animates forever even when scrolled off screen - wastes battery
      </p>
    </div>
  );
}
