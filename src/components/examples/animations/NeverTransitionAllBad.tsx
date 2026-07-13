export function NeverTransitionAllBad() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Hover the card — watch the color and corners crawl.</p>
      <button
        type="button"
        className="block w-48 p-6 rounded-2xl bg-muted text-left text-sm font-medium text-foreground hover:-translate-y-1 hover:rounded-md hover:bg-primary hover:text-primary-foreground"
        style={{ transition: 'all 500ms ease' }}
      >
        Hover me
      </button>
      <p className="text-xs text-destructive">
        <code>transition: all</code> animates every changed property — the color fade and corner morph crawl along and look unintended
      </p>
    </div>
  );
}
