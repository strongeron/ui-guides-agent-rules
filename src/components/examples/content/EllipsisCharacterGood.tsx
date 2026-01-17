export function EllipsisCharacterGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="space-y-3">
          <button className="w-full text-left px-4 py-2 hover:bg-muted rounded-lg flex justify-between items-center">
            <span>Rename…</span>
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-muted rounded-lg flex justify-between items-center">
            <span>Save as…</span>
          </button>
          <div className="px-4 py-2 text-muted-foreground">
            Loading…
          </div>
        </div>
        <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-xs text-green-800 font-mono">
            Using ellipsis: … (U+2026)
          </p>
          <p className="text-xs text-green-700 mt-1">
            Proper spacing, professional appearance
          </p>
        </div>
      </div>
      <p className="text-xs text-green-700 mt-4">
        Proper ellipsis character (…) for professional typography
      </p>
    </div>
  );
}
