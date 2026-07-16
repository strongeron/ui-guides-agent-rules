export function PerspectiveOnParentBad() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center py-8">
      <div className="flex items-center justify-center gap-3">
        {[35, 0, -35].map((deg, i) => (
          <div
            key={i}
            className="flex h-28 w-20 flex-col items-center justify-center gap-1 rounded-lg border border-border bg-gradient-to-br from-card to-muted text-foreground shadow-xl"
            // Each card carries its own perspective() — its own vanishing point.
            style={{ transform: `perspective(300px) rotateY(${deg}deg)` }}
          >
            <span className="text-lg font-semibold">{i + 1}</span>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">card</span>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-xs text-destructive">
        perspective() baked into every card gives each one its own vanishing point — the outer cards warp
        harder than the center, the depth is inconsistent, and the row never sits in one space.
      </p>
    </div>
  );
}
