/**
 * Good: one family carries the prose (mono is reserved for code, which is a reason),
 * one named weight per role, and every size comes from the scale. The range is found
 * with weight and size WITHIN one family, rather than by reaching for a second family.
 */
export function RamsFontConsistencyGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="mb-3 font-medium">Release notes</h4>

        <article className="space-y-2 rounded-lg bg-muted p-4 font-sans">
          {/* Heading: a scale step + the heading weight */}
          <h5 className="text-lg font-semibold">Version 4.2</h5>

          {/* Body: base step, regular weight */}
          <p className="text-sm font-normal">
            Body copy at the base step. Hierarchy comes from weight and size inside one
            family, so nothing has to change voice in order to change emphasis.
          </p>

          {/* Label: same size as body, one weight step up — emphasis without a new family */}
          <p className="text-sm">
            <span className="font-medium">Breaking:</span> the label is emphasised with weight,
            not with a different typeface.
          </p>

          {/* Mono earns its place: it marks code, which is what mono is for */}
          <code className="rounded bg-background p-1 font-mono text-xs">npm i pkg@4.2.0</code>
        </article>

        <div className="mt-3 space-y-1 rounded bg-muted p-2 font-mono text-xs">
          <code className="block">families: font-sans (+ font-mono for code)</code>
          <code className="block">weights: normal / medium / semibold</code>
          <code className="block">sizes: text-lg, text-sm, text-xs</code>
        </div>
      </div>

      <p className="text-xs text-success">
        One family carries the prose; weight names the role; size comes from the scale. Each
        step has a job, so a reader who sees a difference can trust that it means something.
      </p>
    </div>
  );
}
