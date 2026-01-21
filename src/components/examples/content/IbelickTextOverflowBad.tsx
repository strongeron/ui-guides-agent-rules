export function IbelickTextOverflowBad() {
  const items = [
    { title: 'Short title', desc: 'Brief description' },
    { title: 'This is an extremely long title that will break the layout when it wraps to multiple lines unexpectedly', desc: 'This description is also very long and will cause the card to expand way beyond what we expected when designing this component' },
    { title: 'Normal title', desc: 'Normal description' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {items.map((item, i) => (
          <div key={i} className="p-3 bg-muted rounded-lg">
            <p className="font-medium text-sm">{item.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-destructive">
        No overflow handling - long content breaks the grid
      </p>
    </div>
  );
}
