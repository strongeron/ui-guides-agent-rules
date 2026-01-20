export function IbelickTextBalanceBad() {
  return (
    <div className="space-y-4">
      <div className="max-w-xs">
        <h2 className="text-xl font-bold">
          This is a heading that wraps awkwardly
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          This paragraph of text might end up with a single word on the last line which looks
          odd.
        </p>
      </div>
      <p className="text-xs text-destructive">
        No text-wrap control - awkward line breaks and orphans
      </p>
    </div>
  );
}
