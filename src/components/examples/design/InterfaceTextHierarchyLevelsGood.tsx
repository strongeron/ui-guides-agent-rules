/**
 * Good: four levels, used consistently.
 *
 *   primary   — default text, highest contrast
 *   secondary — supporting text, slightly muted
 *   tertiary  — metadata, timestamps, less important
 *   muted     — disabled, placeholder, lowest contrast
 *
 * These are named once and reused, so every role lands on a deliberate step rather
 * than on whichever gray was closest to hand.
 */
const TEXT = {
  primary: 'text-foreground',
  secondary: 'text-neutral-700 dark:text-neutral-300',
  tertiary: 'text-neutral-500 dark:text-neutral-400',
  muted: 'text-neutral-400 dark:text-neutral-600',
} as const;

export function InterfaceTextHierarchyLevelsGood() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <p className="text-xs text-muted-foreground">Four levels: primary / secondary / tertiary / muted</p>

      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className={`text-sm font-medium ${TEXT.primary}`}>Pull request #482</h3>
        <p className={`mt-1 text-sm ${TEXT.secondary}`}>Merge the token refactor into main</p>

        <dl className="mt-3 space-y-1">
          <div className="flex justify-between">
            <dt className={`text-sm ${TEXT.tertiary}`}>Author</dt>
            <dd className={`text-sm ${TEXT.primary}`}>ada</dd>
          </div>
          <div className="flex justify-between">
            <dt className={`text-sm ${TEXT.tertiary}`}>Opened</dt>
            {/* Metadata drops a full step below the supporting copy */}
            <dd className={`text-sm ${TEXT.tertiary}`}>3 days ago</dd>
          </div>
        </dl>

        <div className="mt-3 rounded-md border border-border px-3 py-2">
          {/* Placeholder lives on the lowest step, so it reads as "not yet content" */}
          <span className={`text-sm ${TEXT.muted}`}>Leave a comment&hellip;</span>
        </div>
      </div>

      <div className="space-y-1 rounded-md border border-border bg-muted p-3">
        <p className={`text-xs ${TEXT.primary}`}>Primary &mdash; default text</p>
        <p className={`text-xs ${TEXT.secondary}`}>Secondary &mdash; supporting text</p>
        <p className={`text-xs ${TEXT.tertiary}`}>Tertiary &mdash; metadata, timestamps</p>
        <p className={`text-xs ${TEXT.muted}`}>Muted &mdash; disabled, placeholder</p>
      </div>

      <p className="text-xs text-success">
        Four distinct steps, each with one job. The title leads, the description supports, the
        metadata recedes, and the placeholder is quietly the quietest thing on the card &mdash;
        without changing a single font size.
      </p>
    </div>
  );
}
