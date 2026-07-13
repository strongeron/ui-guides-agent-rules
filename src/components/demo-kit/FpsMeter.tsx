export function FpsMeter({ fps }: { fps: number }) {
  const tone = fps >= 55 ? 'text-success' : fps >= 30 ? 'text-muted-foreground' : 'text-destructive';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-0.5 text-xs font-medium tabular-nums ${tone}`}
      aria-live="off"
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {fps} fps
    </span>
  );
}
