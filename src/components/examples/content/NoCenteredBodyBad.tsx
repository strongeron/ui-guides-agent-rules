export function NoCenteredBodyBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-center text-sm leading-relaxed text-foreground">
          Every line in this paragraph starts at a different horizontal position, so your eye has to
          hunt for the beginning of each one. It reads as balanced in a mockup and as work at length —
          the classic tell of a centered body column.
        </p>
      </div>
      <p className="mt-4 text-xs text-destructive">
        Centered body: no consistent left edge, so the return sweep has nowhere fixed to land.
      </p>
    </div>
  );
}
