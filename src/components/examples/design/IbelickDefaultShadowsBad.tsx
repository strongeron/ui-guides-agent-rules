export function IbelickDefaultShadowsBad() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div
          className="p-4 bg-background rounded-lg shadow-[var(--ex-shadow-a)]"
        >
          <p className="font-medium">Card A</p>
          <p className="text-xs text-muted-foreground">Custom shadow</p>
        </div>
        <div
          className="p-4 bg-background rounded-lg shadow-[var(--ex-shadow-b)]"
        >
          <p className="font-medium">Card B</p>
          <p className="text-xs text-muted-foreground">Another custom</p>
        </div>
        <div
          className="p-4 bg-background rounded-lg shadow-[var(--ex-shadow-c)]"
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
