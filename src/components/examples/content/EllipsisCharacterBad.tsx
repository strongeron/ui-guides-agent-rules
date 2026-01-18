export function EllipsisCharacterBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="space-y-3">
          <button className="w-full text-left px-4 py-2 hover:bg-muted rounded-lg flex justify-between items-center">
            <span>Rename...</span>
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-muted rounded-lg flex justify-between items-center">
            <span>Save as...</span>
          </button>
          <div className="px-4 py-2 text-muted-foreground">
            Loading...
          </div>
        </div>
        <div className="mt-3 bg-error/10 border border-error/20 rounded-lg p-3">
          <p className="text-xs text-error font-mono">
            Using three periods: ... (U+002E × 3)
          </p>
          <p className="text-xs text-error/80 mt-1">
            Wider spacing, looks unprofessional
          </p>
        </div>
      </div>
      <p className="text-xs text-error mt-4">
        Three periods (...) instead of ellipsis character
      </p>
    </div>
  );
}
