export function UnderlineFromFontGood() {
  return (
    <div className="space-y-3">
      <style>{`
        /* 1. Colour-only hover → a real underline is fine, taken from the font's metrics. */
        .ufg-metric {
          text-decoration-line: underline;
          text-underline-position: from-font;
          text-decoration-thickness: from-font;
          text-decoration-skip-ink: auto;
          --underline-ink: var(--muted-foreground);
          text-decoration-color: var(--underline-ink);
          transition: text-decoration-color 200ms ease-out;
        }
        .ufg-metric:hover,
        .ufg-metric:focus-visible {
          --underline-ink: var(--foreground);
        }

        /* 2. Anything richer than colour → a separate element, animated on transform. */
        .ufg-anim {
          position: relative;
          text-decoration-line: none;
        }
        .ufg-anim::after {
          content: '';
          position: absolute;
          inset-inline: 0;
          bottom: -0.12em;
          height: 2px;
          background-image: linear-gradient(currentColor, currentColor);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 220ms ease-out;
        }
        .ufg-anim:hover::after,
        .ufg-anim:focus-visible::after {
          transform: scaleX(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .ufg-anim::after { transition: none; }
        }

        /* Bonus: the conventional hint that a word carries extra information. */
        .ufg-scope abbr {
          text-decoration: underline dotted;
          cursor: help;
        }
      `}</style>

      <div className="ufg-scope space-y-4 rounded-lg border border-border bg-card p-5">
        <p className="font-serif text-2xl leading-snug text-foreground">
          Read the{' '}
          <a
            href="#design-underline-from-font"
            className="ufg-metric focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            typography guidelines
          </a>{' '}
          before you ship.
        </p>

        <p className="font-serif text-2xl leading-snug text-foreground">
          Or skim the{' '}
          <a
            href="#design-underline-from-font"
            className="ufg-anim focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            typography glossary
          </a>{' '}
          instead.
        </p>

        <p className="text-sm text-muted-foreground">
          A dotted underline still means &ldquo;there is more here&rdquo;: <abbr title="Cumulative Layout Shift">CLS</abbr>{' '}
          and <abbr title="Largest Contentful Paint">LCP</abbr>.
        </p>
      </div>

      <p className="text-xs text-success">
        Line 1 pulls position and thickness from the font (<code>from-font</code>) and breaks around
        descenders (<code>skip-ink: auto</code>); its hover animates{' '}
        <code>text-decoration-color</code>, the one part of a real underline that animates reliably. Line
        2 wants a wipe, not a colour change, so the underline is a separate <code>::after</code> element
        animated on <code>transform: scaleX()</code> — which actually moves, on the compositor.
      </p>
    </div>
  );
}
