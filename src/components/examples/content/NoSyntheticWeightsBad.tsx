/**
 * Bad: only weight 400 of the family is loaded, and `font-synthesis` is left at
 * its default. The `<strong>` and the `<em>` still "work" — the browser fakes
 * them, smearing the 400 glyphs sideways for bold and shearing them for italic.
 *
 * The two panels below are rendered with CSS that reproduces what the browser
 * does when it synthesizes: a double-strike for the fake bold, a mechanical
 * `skewX` for the fake oblique. Compare the letterforms, not the slant: a real
 * italic redraws `a` and `f`, a synthesized one just leans the roman.
 */

const FACE_CSS = `@font-face {
  font-family: "AcmeSans";
  src: url("/fonts/acme-sans-400.woff2") format("woff2");
  font-weight: 400;          /* 700 and italic were never loaded */
}
/* font-synthesis left at its default: weight style small-caps */`;

export function NoSyntheticWeightsBad() {
  return (
    <div className="w-full space-y-4">
      <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-3 text-xs text-muted-foreground">
        <code>{FACE_CSS}</code>
      </pre>

      <p className="text-sm text-foreground">
        The markup asks for a <code>&lt;strong&gt;</code> and an <code>&lt;em&gt;</code>. Neither
        file exists, so the browser manufactures them instead of failing:
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-destructive/40 bg-card p-3">
          <p className="mb-2 text-xs font-medium text-destructive">Synthesized bold</p>
          <p
            className="text-4xl text-foreground"
            style={{ fontWeight: 400, textShadow: '0.03em 0 currentColor, -0.03em 0 currentColor' }}
          >
            Bold
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            A blurry double-strike: the same 400 outline drawn twice, a hair apart. Stems thicken,
            counters clog, and the shapes never sharpen at any size.
          </p>
        </div>

        <div className="rounded-lg border border-destructive/40 bg-card p-3">
          <p className="mb-2 text-xs font-medium text-destructive">Synthesized italic</p>
          <p
            className="text-4xl text-foreground"
            style={{ fontStyle: 'normal', transform: 'skewX(-14deg)', transformOrigin: 'left' }}
          >
            after
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            A mechanical slant, not an italic. Look at the <code>a</code> and the <code>f</code>:
            a true italic redraws them (single-storey <code>a</code>, descending <code>f</code>).
            The oblique just leans the roman letter over.
          </p>
        </div>
      </div>

      <p className="text-xs text-destructive">
        Nothing looks broken enough to file a bug, so the missing files ship. Every heading and
        every emphasis in the product is mush, and no one can say when it started.
      </p>
    </div>
  );
}
