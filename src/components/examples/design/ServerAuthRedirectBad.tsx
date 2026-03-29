export function ServerAuthRedirectBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground font-mono">1</span>
            <span className="text-sm text-foreground">Browser loads /dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground font-mono">2</span>
            <span className="text-sm text-foreground">JS bundle downloads & parses</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground font-mono">3</span>
            <span className="text-sm text-foreground">React hydrates, checks auth</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-destructive/20 px-2 py-0.5 rounded text-destructive font-mono">4</span>
            <span className="text-sm text-destructive">Client redirect → /login (flash!)</span>
          </div>
        </div>
        <div className="bg-muted rounded p-2 text-xs text-foreground font-mono">/dashboard → flash → /login</div>
      </div>
      <p className="text-xs text-error">Client-side auth redirect — URL flash and layout shift</p>
    </div>
  );
}
