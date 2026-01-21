export function IbelickDefaultShadowsBad() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div
          className="p-4 bg-background rounded-lg"
          style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.15)' }}
        >
          <p className="font-medium">Card A</p>
          <p className="text-xs text-muted-foreground">Custom shadow</p>
        </div>
        <div
          className="p-4 bg-background rounded-lg"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.12)' }}
        >
          <p className="font-medium">Card B</p>
          <p className="text-xs text-muted-foreground">Another custom</p>
        </div>
        <div
          className="p-4 bg-background rounded-lg"
          style={{ boxShadow: '0 10px 40px -10px rgba(0,0,0,0.25)' }}
        >
          <p className="font-medium">Card C</p>
          <p className="text-xs text-muted-foreground">Yet another</p>
        </div>
      </div>
      <p className="text-xs text-destructive">
        Inconsistent custom shadows - each card has different elevation feel
      </p>
    </div>
  );
}
