export function NeverTransitionAllGood() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Hover the card — only the lift animates.</p>
      <button
        type="button"
        className="block w-48 p-6 rounded-2xl bg-muted text-left text-sm font-medium text-foreground hover:-translate-y-1 hover:rounded-md hover:bg-primary hover:text-primary-foreground"
        style={{ transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        Hover me
      </button>
      <p className="text-xs text-success">
        Only <code>transform</code> transitions; the color and corners snap instantly — crisp and intentional
      </p>
    </div>
  );
}
