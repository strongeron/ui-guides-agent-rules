/**
 * Bad: the tags are sequential (h2 → h3, nothing skipped), so the usual heading
 * lint passes. The SIZES run backwards: the h2 was set at `text-base` because it
 * "looked right" in the card, and the h3 inside it is `text-2xl` because that is
 * the line the designer wanted people to read first.
 *
 * The outline panel on the right is what a screen reader navigates by. Compare it
 * with the card: the two orders disagree.
 *
 * (The heading tags are rendered as labelled divs so this demo does not inject
 * headings into the page's own outline. The class names are the real ones.)
 */

export function HeadingSizeDescendsBad() {
  return (
    <div className="w-full space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
      <div className="rounded-lg border border-destructive/40 bg-card p-4">
        <p className="mb-3 text-xs font-medium text-destructive">What the eye sees</p>

        {/* <h2 className="text-base"> */}
        <div className="text-base font-medium text-muted-foreground">Q3 report</div>

        {/* <h3 className="text-2xl"> — a level DOWN, rendered twice the size */}
        <div className="mt-1 text-2xl font-semibold text-foreground">Revenue up 12%</div>

        <p className="mt-2 text-sm text-muted-foreground">
          Growth came almost entirely from renewals in the enterprise tier.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-muted p-4">
        <p className="mb-3 text-xs font-medium text-muted-foreground">
          What the screen reader announces
        </p>
        <ol className="space-y-2 font-mono text-xs text-foreground">
          <li className="flex items-baseline gap-2">
            <span className="rounded border border-border bg-card px-1 py-0.5 text-muted-foreground">
              h2
            </span>
            <span>Q3 report</span>
            <span className="ml-auto text-muted-foreground">16px</span>
          </li>
          <li className="flex items-baseline gap-2 pl-5">
            <span className="rounded border border-border bg-card px-1 py-0.5 text-muted-foreground">
              h3
            </span>
            <span>Revenue up 12%</span>
            <span className="ml-auto text-destructive">24px</span>
          </li>
        </ol>
        <p className="mt-3 text-xs text-destructive">
          The outline says &ldquo;Revenue up 12%&rdquo; is subordinate to &ldquo;Q3 report&rdquo;.
          The page says the opposite, in 8 extra pixels. A child level rendering larger than its
          parent means the tag was picked for its default size, not from the outline.
        </p>
      </div>
    </div>
  );
}
