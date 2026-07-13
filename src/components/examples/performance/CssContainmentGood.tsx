const cards = Array.from({ length: 40 }, (_, i) => i);

export function CssContainmentGood() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Scroll the list.</p>
      <div className="space-y-2 max-h-40 overflow-y-auto overscroll-contain pr-1">
        {cards.map((i) => (
          <div
            key={i}
            className="p-3 bg-muted rounded-lg [contain:layout_paint] [content-visibility:auto] [contain-intrinsic-size:auto_64px]"
          >
            <h4 className="font-medium text-sm">Item {i + 1}</h4>
            <p className="text-xs text-muted-foreground">Card description text</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-success">
        <code>contain: layout paint</code> isolates each card's layout scope, and <code>content-visibility: auto</code>
        {' '}skips rendering the cards that are scrolled out of view. <code>contain-intrinsic-size</code> reserves their
        height so the scrollbar does not jump
      </p>
    </div>
  );
}
