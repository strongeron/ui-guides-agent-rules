export function PerspectiveOnParentBad() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center py-10">
      <div className="flex items-center justify-center gap-1">
        {[35, 0, -35].map((deg, i) => (
          <div
            key={i}
            className="flex h-24 w-16 items-center justify-center rounded-lg bg-card text-xs text-muted-foreground shadow-md"
            // Each card carries its own perspective() — its own vanishing point.
            style={{ transform: `perspective(300px) rotateY(${deg}deg)` }}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-xs text-destructive">
        perspective() baked into every card gives each one its own vanishing point — the depth is inconsistent and the row never sits in one space.
      </p>
    </div>
  );
}
