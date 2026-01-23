export function CrispBordersGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card rounded-lg p-4 border border-black/[0.08] shadow-md dark:border-white/[0.08]">
        <h3 className="text-lg font-semibold mb-2">Card with Border + Shadow</h3>
        <p className="text-sm text-muted-foreground">
          Subtle semi-transparent border combined with shadow creates crisp, well-defined edges.
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        border-black/[0.08] + shadow-md = crisp edges
      </p>
    </div>
  );
}
