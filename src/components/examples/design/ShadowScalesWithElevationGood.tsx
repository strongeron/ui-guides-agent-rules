export function ShadowScalesWithElevationGood() {
  // Elevation is proportional: a small element sits close to the surface, a large
  // floating one is higher up — so its shadow is larger, softer, and more spread.
  const tight = '0 1px 2px rgba(0, 0, 0, 0.18)';
  const deep = '0 14px 34px -10px rgba(0, 0, 0, 0.30)';
  return (
    <div className="w-full max-w-md py-8">
      <div className="flex items-end justify-center gap-8 rounded-xl bg-muted p-8">
        <div
          className="rounded-md bg-card px-3 py-1.5 text-xs text-foreground"
          style={{ boxShadow: tight }}
        >
          Chip
        </div>
        <div
          className="flex h-36 w-56 items-center justify-center rounded-xl bg-card text-sm text-muted-foreground"
          style={{ boxShadow: deep }}
        >
          Full sheet
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-success">
        Shadow scales with size: a tight shadow keeps the chip grounded, a larger soft one lifts the sheet.
      </p>
    </div>
  );
}
