export function IbelickWillChangeGood() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="p-4 bg-muted rounded-lg text-center text-sm hover:scale-105 transition-transform group"
          >
            <span className="group-hover:will-change-transform">Item {i + 1}</span>
          </div>
        ))}
      </div>
      <code className="block text-xs p-2 bg-muted rounded">
        className="hover:will-change-transform"
      </code>
      <p className="text-xs text-success">
        will-change only applied on hover - browser optimizes when needed
      </p>
    </div>
  );
}
