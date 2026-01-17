export function LargeListsGood() {
  const items = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
    description: `This is the description for item ${i + 1}`
  }));

  return (
    <div className="w-full max-w-sm">
      <div className="h-64 overflow-auto bg-card border border-border rounded-lg">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3 border-b border-border"
            style={{ contentVisibility: 'auto' }}
          >
            <div className="font-medium text-sm">{item.title}</div>
            <div className="text-xs text-muted-foreground">{item.description}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-green-700 mt-4">
        content-visibility: auto skips rendering off-screen items
      </p>
    </div>
  );
}
