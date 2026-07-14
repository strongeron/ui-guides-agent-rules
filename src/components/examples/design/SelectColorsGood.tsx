/**
 * GOOD: The <select> declares BOTH `background-color` and `color` from theme tokens,
 * and the scope declares `color-scheme: dark` so the native option popup is drawn
 * dark too. Nothing is left to the platform's guess.
 */
export function SelectColorsGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
        <pre className="text-foreground">{`select {
  color: var(--foreground);
  background-color: var(--card); /* both! */
}
/* and on the scope: */
color-scheme: dark; /* styles the popup */`}</pre>
      </div>

      {/* Dark page whose <select> declares its own fill */}
      <div
        className="dark bg-background text-foreground border border-border rounded-lg p-4 space-y-3"
        style={{ colorScheme: 'dark' }}
      >
        <label className="block space-y-1">
          <span className="text-xs font-medium text-muted-foreground">Environment</span>
          <select
            defaultValue="production"
            className="bg-card text-foreground border border-border w-full rounded-md p-2 text-sm"
          >
            <option value="production">Production</option>
            <option value="preview">Preview</option>
            <option value="development">Development</option>
          </select>
        </label>

        <label className="block space-y-1">
          <span className="text-xs font-medium text-muted-foreground">Region</span>
          <select
            defaultValue="iad1"
            className="bg-card text-foreground border border-border w-full rounded-md p-2 text-sm"
          >
            <option value="iad1">Washington, D.C.</option>
            <option value="fra1">Frankfurt</option>
            <option value="hnd1">Tokyo</option>
          </select>
        </label>
      </div>

      <p className="text-xs text-success">
        Value and options stay readable: explicit fill, explicit text color, and a
        matching color-scheme for the popup.
      </p>
    </div>
  );
}
