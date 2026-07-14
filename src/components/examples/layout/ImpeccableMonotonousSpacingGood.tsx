/**
 * Good: spacing carries the grouping.
 *
 * - 8px between siblings inside a group (label ↔ its own input)
 * - 24px between groups inside a section
 * - 64px between sections
 *
 * Three distinct values, none dominant, and the structure is legible without a
 * single border or divider — proximity is doing the work that chrome would
 * otherwise have to fake.
 */
export function ImpeccableMonotonousSpacingGood() {
  return (
    <div className="w-full">
      <div className="flex flex-col" style={{ gap: '64px', padding: '16px' }}>
        {/* Section 1 */}
        <section className="flex flex-col" style={{ gap: '24px' }}>
          <h4 className="text-sm font-semibold text-foreground">Billing</h4>

          <div className="flex flex-col" style={{ gap: '8px' }}>
            <label className="text-xs text-muted-foreground" htmlFor="rhythm-card">
              Card number
            </label>
            <input
              id="rhythm-card"
              placeholder="4242 4242 4242 4242"
              className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="flex flex-col" style={{ gap: '8px' }}>
            <label className="text-xs text-muted-foreground" htmlFor="rhythm-zip">
              Billing ZIP
            </label>
            <input
              id="rhythm-zip"
              placeholder="10001"
              className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </section>

        {/* Section 2 — 64px away, so it reads as a different thing */}
        <section className="flex flex-col" style={{ gap: '24px' }}>
          <h4 className="text-sm font-semibold text-foreground">Notifications</h4>

          <div className="flex flex-col" style={{ gap: '8px' }}>
            <label className="text-xs text-muted-foreground" htmlFor="rhythm-email">
              Email
            </label>
            <input
              id="rhythm-email"
              placeholder="you@example.com"
              className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </section>
      </div>

      <p className="mt-2 text-xs text-success">
        8px inside a group, 24px between groups, 64px between sections. Each label is now visibly
        bound to its own field, and the two sections are visibly separate &mdash; no borders, no
        dividers, no headings needed to tell them apart.
      </p>
    </div>
  );
}
