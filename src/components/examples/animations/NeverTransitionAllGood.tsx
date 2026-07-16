export function NeverTransitionAllGood() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Hover the card — the lift and color glide, the corner snaps.</p>
      <button
        type="button"
        className="block w-48 rounded-2xl bg-muted p-6 text-left text-sm font-medium text-foreground hover:-translate-y-1 hover:rounded-md hover:bg-primary hover:text-primary-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        style={{
          transition:
            'transform 220ms cubic-bezier(0.16, 1, 0.3, 1), background-color 220ms cubic-bezier(0.16, 1, 0.3, 1), color 220ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        Hover me
      </button>
      <p className="text-xs text-success">
        Only the listed properties (<code>transform</code>, <code>background-color</code>, <code>color</code>)
        animate. The corner radius isn&apos;t in the list, so it snaps — you control exactly what moves.
      </p>
    </div>
  );
}
