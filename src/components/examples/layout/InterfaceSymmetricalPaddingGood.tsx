/**
 * Good: padding is uniform (`padding: 16px`), or at most a single horizontal/vertical
 * pair (`padding: 12px 16px`) when the horizontal side genuinely needs more room.
 * Never four different values.
 */
export function InterfaceSymmetricalPaddingGood() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <p className="text-xs text-muted-foreground">Uniform padding: 16 on all four sides</p>

      {/* p-4 = 16px on every side */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="rounded-md bg-muted p-3">
          <p className="text-sm font-medium text-foreground">Deploy succeeded</p>
          <p className="mt-1 text-xs text-muted-foreground">main &middot; 2 minutes ago</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        The one allowed asymmetry: a single H/V pair &mdash; 12 vertical, 16 horizontal
      </p>

      {/* py-3 = 12px, px-4 = 16px — one pair, still symmetric on each axis */}
      <div className="rounded-xl border border-border bg-card py-3 px-4">
        <div className="rounded-md bg-muted p-3">
          <p className="text-sm font-medium text-foreground">Build queued</p>
          <p className="mt-1 text-xs text-muted-foreground">preview &middot; just now</p>
        </div>
      </div>

      <p className="text-xs text-success">
        Top matches bottom, left matches right. The content is centred in its own box, so a column
        of these cards has one repeating rhythm instead of four private ones.
      </p>
    </div>
  );
}
