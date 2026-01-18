export function PageTitlesGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-gray-300 rounded-sm" />
          <span className="text-sm font-medium">Browser Tabs</span>
        </div>
        <div className="space-y-2 mb-3">
          <div className="bg-muted rounded-lg p-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-xs font-mono truncate">Dashboard - My App</span>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-xs font-mono truncate">Settings - My App</span>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-xs font-mono truncate">Edit Profile - My App</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Each page has a unique title reflecting the current context.
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        Dynamic titles help users navigate between tabs
      </p>
    </div>
  );
}
