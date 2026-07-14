export function BorderCurrentcolorBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
        <pre className="text-error">{`<div class="border p-4">   <!-- width, no color -->`}</pre>
      </div>

      {/* Live: `border` with no color resolves to currentColor, so each card's
          outline inherits whatever text color happens to be on it. */}
      <div className="border p-4 rounded-lg text-foreground">
        <p className="text-sm font-medium">Default card</p>
        <p className="text-xs">
          In v3 this was a soft gray hairline. Now it is the text color: a hard, near-black box.
        </p>
      </div>

      <div className="border p-4 rounded-lg text-destructive">
        <p className="text-sm font-medium">Same markup, error state</p>
        <p className="text-xs">
          Add <code className="font-mono">text-destructive</code> and the border turns red with it. It tracks the
          foreground, not the surface.
        </p>
      </div>

      <p className="text-xs text-error">
        border-color now defaults to currentColor. Every un-colored border grew an outline nobody asked for — and no
        build error said so.
      </p>
    </div>
  );
}
