export function IbelickWillChangeBad() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="p-4 bg-muted rounded-lg text-center text-sm hover:scale-105 transition-transform"
            style={{ willChange: 'transform, opacity, filter' }}
          >
            Item {i + 1}
          </div>
        ))}
      </div>
      <code className="block text-xs p-2 bg-muted rounded">
        style={'{'}{'{'} willChange: 'transform, opacity, filter' {'}'}{'}'}
      </code>
      <p className="text-xs text-destructive">
        Permanent will-change on every item wastes GPU memory
      </p>
    </div>
  );
}
