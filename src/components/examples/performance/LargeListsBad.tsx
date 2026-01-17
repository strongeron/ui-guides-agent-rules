export function LargeListsBad() {
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
    description: `This is the description for item ${i + 1}`
  }));

  return (
    <div className="w-full max-w-sm">
      <div className="h-64 overflow-auto bg-card border border-border rounded-lg">
        {items.map((item) => (
          <div key={item.id} className="p-3 border-b border-border">
            <div className="font-medium text-sm">{item.title}</div>
            <div className="text-xs text-muted-foreground">{item.description}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-red-700 mt-4">
        Rendering 1000 DOM nodes causes performance issues
      </p>
    </div>
  );
}
