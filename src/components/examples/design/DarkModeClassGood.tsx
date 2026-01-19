export function DarkModeClassGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Class-Based Dark Mode</h4>
        <div className="bg-muted rounded-md p-3 font-mono text-xs mb-4">
          <code>darkMode: 'class'</code>
        </div>
        <div className="space-y-3">
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 bg-background border border-border rounded text-sm">
              Light
            </button>
            <button className="flex-1 px-3 py-2 bg-foreground text-background rounded text-sm">
              Dark
            </button>
            <button className="flex-1 px-3 py-2 bg-muted text-muted-foreground rounded text-sm">
              System
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            User can choose their preference
          </p>
        </div>
      </div>
      <div className="text-sm space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success" />
          <span>User-controllable theme</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success" />
          <span>Can persist preference</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success" />
          <span>Supports system option</span>
        </div>
      </div>
      <p className="text-xs text-success">
        Class strategy enables full theme control
      </p>
    </div>
  );
}
