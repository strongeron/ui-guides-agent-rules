export function ShadowScalesWithElevationBad() {
  // One shadow token reused at every size — the mistake this principle warns about.
  const flat = '0 4px 10px rgba(0, 0, 0, 0.22)';
  return (
    <div className="w-full max-w-md py-8">
      <div className="flex items-end justify-center gap-8 rounded-xl bg-muted p-8">
        <div
          className="rounded-md bg-card px-3 py-1.5 text-xs text-foreground"
          style={{ boxShadow: flat }}
        >
          Chip
        </div>
        <div
          className="flex h-36 w-56 items-center justify-center rounded-xl bg-card text-sm text-muted-foreground"
          style={{ boxShadow: flat }}
        >
          Full sheet
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-destructive">
        Same shadow at every size: the chip floats too high, the sheet looks pasted on flat.
      </p>
    </div>
  );
}
