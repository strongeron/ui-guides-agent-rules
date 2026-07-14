/**
 * Bad: all three axes of the upstream bullet fail at once — four font families, a
 * weight picked per paragraph, and four sizes that belong to no scale. Each choice
 * looked reasonable in isolation; together the card has no typographic system.
 */
export function RamsFontConsistencyBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="mb-3 font-medium">Release notes</h4>

        <article className="space-y-2 rounded-lg bg-muted p-4">
          {/* Serif italic display face, off-scale size */}
          <h5 className="font-serif italic" style={{ fontSize: '19px', fontWeight: 600 }}>
            Version 4.2
          </h5>

          {/* Sans body — but a hand-picked 15px and a nudged weight */}
          <p className="font-sans" style={{ fontSize: '15px', fontWeight: 450 }}>
            Body copy in the sans family, at a size that exists nowhere else in the product.
          </p>

          {/* Mono, for no reason, at yet another size */}
          <p className="font-mono" style={{ fontSize: '13px', fontWeight: 500 }}>
            This paragraph is monospace because it happened to look tidy.
          </p>

          {/* A fourth family, arrived at by copy-paste */}
          <p style={{ fontFamily: 'cursive', fontSize: '11px', fontWeight: 700 }}>
            And the fine print picked up a fourth family entirely.
          </p>
        </article>

        <div className="mt-3 space-y-1 rounded bg-muted p-2 font-mono text-xs">
          <code className="block text-error">families: serif, sans, mono, cursive</code>
          <code className="block text-error">weights: 600, 450, 500, 700</code>
          <code className="block text-error">sizes: 19px, 15px, 13px, 11px</code>
        </div>
      </div>

      <p className="text-xs text-error">
        Four voices, four weights, four sizes off any scale. The reader cannot tell which
        differences are meaningful, so size and weight stop working as signals at all &mdash;
        and every value is a style attribute, so no token can ever fix it centrally.
      </p>
    </div>
  );
}
