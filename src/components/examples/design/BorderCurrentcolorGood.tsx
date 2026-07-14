export function BorderCurrentcolorGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
        <pre className="text-foreground">{`<div class="border border-border p-4">  <!-- width + color -->`}</pre>
      </div>

      {/* The width and the color are always written together. The hairline is
          bound to the surface token, so it flips with the theme. */}
      <div className="border border-border p-4 rounded-lg bg-card text-card-foreground">
        <p className="text-sm font-medium">Default card</p>
        <p className="text-xs text-muted-foreground">
          A hairline that belongs to the surface, not to the text.
        </p>
      </div>

      <div className="border border-border p-4 rounded-lg bg-card text-destructive">
        <p className="text-sm font-medium">Same markup, error state</p>
        <p className="text-xs text-muted-foreground">
          The text turns red. The border does not follow it anywhere.
        </p>
      </div>

      <p className="text-xs text-success">
        Never write a border width without a border color in the same breath. Use a semantic token so it flips with the
        theme.
      </p>
    </div>
  );
}
