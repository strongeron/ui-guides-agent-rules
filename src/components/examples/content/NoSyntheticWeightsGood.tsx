/**
 * Good: `font-synthesis: none` on the root. The browser stops covering for the
 * missing files, so a `<strong>` with no 700 face loaded renders as plain 400 —
 * visibly wrong, caught in dev, fixed before it ships.
 *
 * The left panel shows the honest failure; the right shows the fix (load the
 * face). Either way you now know which one you are looking at.
 */

const ROOT_CSS = `:root {
  font-synthesis: none;      /* no faked bold, no faked oblique */
}

@font-face { font-family: "AcmeSans"; src: url("/fonts/acme-sans-400.woff2") format("woff2"); font-weight: 400; }
@font-face { font-family: "AcmeSans"; src: url("/fonts/acme-sans-700.woff2") format("woff2"); font-weight: 700; }
@font-face { font-family: "AcmeSans"; src: url("/fonts/acme-sans-400-italic.woff2") format("woff2"); font-weight: 400; font-style: italic; }`;

export function NoSyntheticWeightsGood() {
  return (
    <div className="w-full space-y-4">
      <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-3 text-xs text-muted-foreground">
        <code>{ROOT_CSS}</code>
      </pre>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Face missing, synthesis off
          </p>
          <p className="text-4xl font-normal text-foreground">Bold</p>
          <p className="mt-2 text-xs text-muted-foreground">
            The <code>&lt;strong&gt;</code> renders at 400. It is unmistakably not bold, so the
            missing <code>700</code> file is a bug you can see in review instead of a texture you
            slowly stop noticing.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-3">
          <p className="mb-2 text-xs font-medium text-success">Face loaded</p>
          <p className="text-4xl font-bold text-foreground">Bold</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Real 700 outlines: even stems, open counters, crisp at every size. This is the shape the
            fake was pretending to be.
          </p>
        </div>
      </div>

      <p className="text-xs text-success">
        <code>font-synthesis: none</code> does not make type better on its own — it makes a missing
        file fail loudly. A build that renders plain 400 where it promised bold gets fixed; a build
        that renders a smear gets shipped.
      </p>
    </div>
  );
}
