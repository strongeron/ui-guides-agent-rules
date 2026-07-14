/**
 * Bad: every gap on the page is 16px.
 *
 * The detector collects every padding / margin / gap value, rounds each to the
 * nearest 4px, and — once it has at least 10 — flags the page when one value
 * accounts for more than 60% of them and there are 3 or fewer unique values.
 * Here there is exactly one value, so it is 100% of ~14 collected values.
 *
 * The cost is not ugliness, it is illegibility: a label sits as far from its own
 * input as it does from the next section, so nothing groups. Everything floats
 * at equal weight and the reader has to parse the structure from the words.
 */
export function ImpeccableMonotonousSpacingBad() {
  return (
    <div className="w-full">
      {/* Every gap below is 16px: section, group, and sibling all identical */}
      <div className="flex flex-col" style={{ gap: '16px', padding: '16px' }}>
        <div className="flex flex-col" style={{ gap: '16px' }}>
          <h4 className="text-sm font-semibold text-foreground">Billing</h4>
          <label className="text-xs text-muted-foreground" htmlFor="mono-card">
            Card number
          </label>
          <input
            id="mono-card"
            placeholder="4242 4242 4242 4242"
            className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
          <label className="text-xs text-muted-foreground" htmlFor="mono-zip">
            Billing ZIP
          </label>
          <input
            id="mono-zip"
            placeholder="10001"
            className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="flex flex-col" style={{ gap: '16px' }}>
          <h4 className="text-sm font-semibold text-foreground">Notifications</h4>
          <label className="text-xs text-muted-foreground" htmlFor="mono-email">
            Email
          </label>
          <input
            id="mono-email"
            placeholder="you@example.com"
            className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      <p className="mt-2 text-xs text-error">
        One spacing value, used for everything: 100% dominance across 3 unique values or fewer, so
        the detector flags it. &ldquo;Billing&rdquo; is no closer to its own fields than it is to
        &ldquo;Notifications&rdquo; &mdash; the two sections read as one flat list.
      </p>
    </div>
  );
}
