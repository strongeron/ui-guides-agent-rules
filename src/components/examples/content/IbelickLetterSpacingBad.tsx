export function IbelickLetterSpacingBad() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold tracking-[0.2em]">
          HERO HEADING
        </h3>
        <p className="text-sm tracking-tight">
          This body text has tighter letter spacing applied to it, which makes it harder to read at smaller sizes.
        </p>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm tracking-widest">
          CALL TO ACTION
        </button>
      </div>
      <p className="text-xs text-destructive">
        Custom letter-spacing everywhere - inconsistent and harder to read
      </p>
    </div>
  );
}
