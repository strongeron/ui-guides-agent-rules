/**
 * Good: the tag comes from the document outline, the size comes from a descending
 * step of the type scale. h2 (24px) > h3 (16px), and the visual order now agrees
 * with the order a screen reader reads out.
 *
 * The "big line" the designer wanted is still there — it is just not a heading. A
 * display-size `<p>` carries the emphasis without claiming a rank in the outline.
 *
 * (The heading tags are rendered as labelled divs so this demo does not inject
 * headings into the page's own outline. The class names are the real ones.)
 */

export function HeadingSizeDescendsGood() {
  return (
    <div className="w-full space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="mb-3 text-xs font-medium text-success">What the eye sees</p>

        {/* <h2 className="text-2xl"> — highest level on the card, largest step */}
        <div className="text-2xl font-semibold text-foreground">Q3 report</div>

        {/* Not a heading at all: a display-size paragraph. It can be as loud as it likes. */}
        <p className="mt-1 text-xl font-medium text-muted-foreground">Revenue up 12%</p>

        {/* <h3 className="text-base"> — one level down, one step down the scale */}
        <div className="mt-4 text-base font-medium text-foreground">Enterprise renewals</div>

        <p className="mt-1 text-sm text-muted-foreground">
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
            <span className="ml-auto text-success">24px</span>
          </li>
          <li className="flex items-baseline gap-2 pl-5">
            <span className="rounded border border-border bg-card px-1 py-0.5 text-muted-foreground">
              h3
            </span>
            <span>Enterprise renewals</span>
            <span className="ml-auto text-success">16px</span>
          </li>
        </ol>
        <p className="mt-3 text-xs text-success">
          Sizes descend with the level, so the outline and the page tell the same story. The subtitle
          is loud and still not in the list — because it is a <code>&lt;p&gt;</code>, styled with
          CSS, not an <code>h3</code> borrowed for its size.
        </p>
      </div>
    </div>
  );
}
