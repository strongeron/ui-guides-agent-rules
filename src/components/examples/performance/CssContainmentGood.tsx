export function CssContainmentGood() {
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
            className="p-3 bg-muted rounded-lg [contain:layout_paint]"
          >
            <h4 className="font-medium text-sm">{item.title}</h4>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-success">
        [contain:layout_paint] isolates each card's layout scope
      </p>
    </div>
  );
}
