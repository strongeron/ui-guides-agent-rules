export function PerspectiveOnParentGood() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center py-8">
      {/* One perspective on the shared container — one vanishing point. */}
      <div className="flex items-center justify-center gap-3" style={{ perspective: '700px' }}>
        {[35, 0, -35].map((deg, i) => (
          <div
            key={i}
            className="flex h-28 w-20 flex-col items-center justify-center gap-1 rounded-lg border border-border bg-gradient-to-br from-card to-muted text-foreground shadow-xl"
            style={{ transform: `rotateY(${deg}deg)` }}
          >
            <span className="text-lg font-semibold">{i + 1}</span>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">card</span>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-xs text-success">
        One perspective on the parent: all three cards share a vanishing point and read as a single shelf
        receding into space.
      </p>
    </div>
  );
}
