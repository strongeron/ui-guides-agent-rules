export function CompleteThemeGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div>
          <h4 className="font-medium mb-2">Background and foreground pairs</h4>
          <div className="space-y-2">
            {[
              ['bg-primary text-primary-foreground', 'primary'],
              ['bg-secondary text-secondary-foreground', 'secondary'],
              ['bg-muted text-muted-foreground', 'muted'],
              ['bg-destructive text-destructive-foreground', 'destructive'],
            ].map(([cls, name]) => (
              <div key={name} className={`flex items-center justify-between p-2 rounded ${cls}`}>
                <span className="text-sm">{name}</span>
                <span className="text-xs opacity-80">+ foreground</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-border">
          <h4 className="font-medium mb-2">State variants</h4>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1.5 rounded-md text-sm bg-primary text-primary-foreground transition-colors hover:bg-primary/90 active:bg-primary/80">
              Hover and press me
            </button>
            <button
              disabled
              className="px-3 py-1.5 rounded-md text-sm bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Disabled
            </button>
          </div>
          <input
            type="text"
            placeholder="Focus to see the ring"
            className="mt-2 w-full px-3 py-2 bg-background border border-border rounded focus:outline-hidden focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <p className="text-xs text-success">
        A complete theme: every background has a matching foreground, plus tokens for the hover, active, disabled and
        focus-ring states
      </p>
    </div>
  );
}
