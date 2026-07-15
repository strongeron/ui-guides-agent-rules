export function NoCenteredBodyGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-left text-sm leading-relaxed text-foreground">
          Every line in this paragraph starts at the same horizontal position, so your eye returns to one
          fixed edge and the next line begins automatically. Flush-left with a ragged right edge is what
          running text wants; centering is for short, deliberate lines.
        </p>
      </div>
      <p className="mt-4 text-xs text-success">
        Flush-left: the eye returns to one fixed edge, so each new line begins without a hunt.
      </p>
    </div>
  );
}
