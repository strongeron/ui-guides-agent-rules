export function EmphasisOneSignalBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-foreground">
        <p>
          This is <span className="font-bold italic underline">extremely important</span> and you should{' '}
          <span className="underline">read it carefully</span> before continuing.
        </p>
      </div>
      <p className="mt-4 text-xs text-destructive">
        Bold + italic + underline stacked on one phrase, and underlined text that looks clickable but isn’t.
      </p>
    </div>
  );
}
