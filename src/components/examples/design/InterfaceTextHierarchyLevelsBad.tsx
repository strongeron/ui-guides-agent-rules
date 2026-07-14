/**
 * Bad: two text levels — "text" and "gray text". The card title, the field labels,
 * the supporting copy, the timestamp and the placeholder all land on one of two steps,
 * so nothing recedes and nothing leads. The hierarchy is flat.
 */
export function InterfaceTextHierarchyLevelsBad() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <p className="text-xs text-muted-foreground">Two levels: primary + one gray</p>

      <div className="rounded-xl border border-border bg-card p-4">
        {/* Level 1 */}
        <h3 className="text-sm font-medium text-foreground">Pull request #482</h3>
        {/* Level 2 — and every remaining role is also level 2 */}
        <p className="mt-1 text-sm text-muted-foreground">Merge the token refactor into main</p>

        <dl className="mt-3 space-y-1">
          <div className="flex justify-between">
            <dt className="text-sm text-muted-foreground">Author</dt>
            <dd className="text-sm text-foreground">ada</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-muted-foreground">Opened</dt>
            {/* Metadata sits on the exact same step as the supporting copy above */}
            <dd className="text-sm text-muted-foreground">3 days ago</dd>
          </div>
        </dl>

        <div className="mt-3 rounded-md border border-border px-3 py-2">
          {/* Placeholder — also the same gray */}
          <span className="text-sm text-muted-foreground">Leave a comment&hellip;</span>
        </div>
      </div>

      <p className="text-xs text-error">
        The timestamp, the field labels, the supporting sentence and the disabled placeholder are
        the same gray, so they compete instead of stacking. Only two steps exist, so the eye has
        exactly one decision to make and every secondary role shouts at the same volume.
      </p>
    </div>
  );
}
