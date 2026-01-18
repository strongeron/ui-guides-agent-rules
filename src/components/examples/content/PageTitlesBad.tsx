export function PageTitlesBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-muted rounded-sm" />
          <span className="text-sm font-medium">Browser Tab</span>
        </div>
        <div className="bg-muted rounded-lg p-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-xs font-mono truncate">My App</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Page title stays "My App" everywhere. Users with multiple tabs can't distinguish between pages.
        </p>
        <div className="mt-3 bg-error/10 border border-error/20 rounded-lg p-2">
          <code className="text-xs text-error font-mono">
            {'<title>My App</title>'} {/* Static on all pages */}
          </code>
        </div>
      </div>
      <p className="text-xs text-error mt-4">
        Same title on all pages - can't identify tabs
      </p>
    </div>
  );
}
