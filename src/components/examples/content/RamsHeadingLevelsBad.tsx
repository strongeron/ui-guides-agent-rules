export function RamsHeadingLevelsBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Skipped Heading Levels</h4>
        <div className="p-3 bg-muted rounded-lg space-y-2">
          <div className="text-lg font-semibold">h1: Page Title</div>
          <div className="pl-4 space-y-2">
            <div className="text-sm font-medium text-muted-foreground line-through">
              h2: (skipped!)
            </div>
            <div className="text-base font-medium">h3: Features</div>
            <div className="pl-4 space-y-1">
              <div className="text-sm font-medium text-muted-foreground line-through">
                h4: (skipped!)
              </div>
              <div className="text-xs font-medium">h5: Speed</div>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code className="text-error">h1 → h3 → h5 (broken outline)</code>
        </div>
      </div>
      <p className="text-xs text-error">
        Broken document outline - users think content is missing
      </p>
    </div>
  );
}
