export function WillChangeSparinglyBad() {
  const items = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Hover any card. Looks fine — but look at the caption.</p>
      <div className="grid grid-cols-3 gap-2">
        {items.map((i) => (
          <div
            key={i}
            className="h-14 bg-primary rounded flex items-center justify-center text-primary-foreground text-xs font-medium transition-transform duration-200 ease-out hover:scale-105"
            // BAD: will-change left on permanently, on every card
            style={{ willChange: 'transform' }}
          >
            Card {i + 1}
          </div>
        ))}
      </div>
      <p className="text-xs text-destructive">
        Identical hover, but <code>will-change: transform</code> is hardcoded on all 6 cards — each reserves a GPU layer even while idle, wasting memory
      </p>
    </div>
  );
}
