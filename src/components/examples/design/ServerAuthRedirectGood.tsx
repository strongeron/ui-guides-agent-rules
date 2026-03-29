export function ServerAuthRedirectGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground font-mono">1</span>
            <span className="text-sm text-foreground">Browser requests /dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-primary/20 px-2 py-0.5 rounded text-primary font-mono">2</span>
            <span className="text-sm text-primary">Server checks auth → 302 /login</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground font-mono">3</span>
            <span className="text-sm text-foreground">Browser loads /login directly</span>
          </div>
        </div>
        <div className="bg-muted rounded p-2 text-xs text-foreground font-mono">/dashboard → 302 → /login (seamless)</div>
      </div>
      <p className="text-xs text-success">Server-side redirect — no flash, clean URL transition</p>
    </div>
  );
}
