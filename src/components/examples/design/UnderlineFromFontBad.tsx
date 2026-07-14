export function UnderlineFromFontBad() {
  return (
    <div className="space-y-3">
      <style>{`
        .ufb-link {
          /* Browser-decided underline: sits where it lands, at whatever thickness. */
          text-decoration-line: underline;
          text-decoration-skip-ink: none;
          text-underline-offset: 0;
          text-decoration-thickness: 2px;
          /* Wishful thinking: thickness is not reliably animatable. */
          transition: text-decoration-thickness 200ms ease-out;
        }
        .ufb-link:hover,
        .ufb-link:focus-visible {
          text-decoration-thickness: 5px;
        }
      `}</style>

      <div className="rounded-lg border border-border bg-card p-5">
        <p className="font-serif text-2xl leading-snug text-foreground">
          Read the{' '}
          <a
            href="#design-underline-from-font"
            className="ufb-link text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            typography guidelines
          </a>{' '}
          before you ship.
        </p>
      </div>

      <p className="text-xs text-destructive">
        The line is drawn straight through the descenders of <span className="font-serif">g</span>,{' '}
        <span className="font-serif">y</span> and <span className="font-serif">p</span> — nothing told the
        browser to use the font&apos;s own underline metrics, and{' '}
        <code>text-decoration-skip-ink: none</code> stops it breaking around them. Hover it: the
        thickness transition either snaps or does nothing at all, because thickness is not a reliably
        animatable property.
      </p>
    </div>
  );
}
