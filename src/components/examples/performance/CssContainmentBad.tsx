export function CssContainmentBad() {
  const items = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
    description: 'Card description text',
  }));

  return (
    <div className="space-y-4">
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-muted rounded-lg"
            // No CSS containment - layout changes affect entire document
          >
            <h4 className="font-medium text-sm">{item.title}</h4>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-destructive">
        ✗ No CSS containment - layout changes in cards affect entire document tree
      </p>
    </div>
  );
}
