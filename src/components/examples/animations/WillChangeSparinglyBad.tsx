export function WillChangeSparinglyBad() {
  const items = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {items.map((i) => (
          <div
            key={i}
            className="h-12 bg-primary rounded flex items-center justify-center text-primary-foreground text-xs font-medium"
            style={{
              // BAD: will-change applied to many elements permanently
              willChange: 'transform, opacity',
            }}
          >
            Card {i + 1}
          </div>
        ))}
      </div>
      <p className="text-xs text-destructive">
        ✗ will-change on all cards permanently - wastes GPU memory (6 extra compositor layers)
      </p>
    </div>
  );
}
