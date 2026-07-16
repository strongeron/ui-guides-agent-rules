export function NeverTransitionAllBad() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Hover the card — everything crawls, corners and all.</p>
      <button
        type="button"
        className="block w-48 rounded-2xl bg-muted p-6 text-left text-sm font-medium text-foreground hover:-translate-y-1 hover:rounded-md hover:bg-primary hover:text-primary-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        style={{ transition: 'all 500ms ease' }}
      >
        Hover me
      </button>
      <p className="text-xs text-destructive">
        <code>transition: all</code> animates every changed property — including the corner-radius morph you
        never intended — and the whole thing crawls at 500ms.
      </p>
    </div>
  );
}
