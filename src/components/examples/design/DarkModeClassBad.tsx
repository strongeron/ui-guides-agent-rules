export function DarkModeClassBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Media-Only Dark Mode</h4>
        <div className="bg-muted rounded-md p-3 font-mono text-xs mb-4">
          <code className="text-error">darkMode: 'media'</code>
        </div>
        <div className="space-y-3">
          <div className="flex gap-2 opacity-50">
            <button className="flex-1 px-3 py-2 bg-muted border border-border rounded text-sm" disabled>
              Light
            </button>
            <button className="flex-1 px-3 py-2 bg-muted border border-border rounded text-sm" disabled>
              Dark
            </button>
            <button className="flex-1 px-3 py-2 bg-primary/20 border border-primary rounded text-sm">
              System Only
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Only responds to OS preference
          </p>
        </div>
      </div>
      <div className="text-sm space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-error" />
          <span>No user override</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-error" />
          <span>Can't persist preference</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-error" />
          <span>Locked to system setting</span>
        </div>
      </div>
      <p className="text-xs text-error">
        Media strategy provides no user control
      </p>
    </div>
  );
}
