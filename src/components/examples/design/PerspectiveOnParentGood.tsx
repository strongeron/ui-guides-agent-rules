export function PerspectiveOnParentGood() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center py-10">
      {/* One perspective on the shared container — one vanishing point. */}
      <div className="flex items-center justify-center gap-1" style={{ perspective: '700px' }}>
        {[35, 0, -35].map((deg, i) => (
          <div
            key={i}
            className="flex h-24 w-16 items-center justify-center rounded-lg bg-card text-xs text-muted-foreground shadow-md"
            style={{ transform: `rotateY(${deg}deg)` }}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-xs text-success">
        One perspective on the parent: all three cards share a vanishing point and read as a single shelf receding into space.
      </p>
    </div>
  );
}
