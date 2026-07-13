export function CrispBordersBad() {
  return (
    <div className="space-y-4">
      {/* Light plate: the edge treatment is the point, and it is invisible on the dark theme. */}
      <div className="rounded-xl bg-neutral-100 p-8">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="text-base font-semibold mb-1 text-neutral-900">Shadow only</h3>
          <p className="text-sm text-neutral-600">
            With no border, the card fades into the surface. There is no crisp line where it ends.
          </p>
        </div>
      </div>
      <p className="text-xs text-destructive">
        A shadow alone leaves a soft, muddy edge. The boundary of the card is a gradient, not a line
      </p>
    </div>
  );
}
