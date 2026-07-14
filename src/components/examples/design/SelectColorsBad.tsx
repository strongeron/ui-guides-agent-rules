/**
 * BAD: The dark theme sets `color` on the <select> but never `background-color`,
 * so the control keeps the UA's *light* Field background. Light text lands on a
 * light background and the value — plus every option in the popup — is unreadable.
 *
 * This is the classic Windows dark-mode failure: authors style the text, forget the
 * fill, and the platform supplies a light one.
 */
export function SelectColorsBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
        <pre className="text-error">{`select {
  color: var(--foreground); /* near-white */
  /* background-color never set →      */
  /* the UA paints its own light Field */
}`}</pre>
      </div>

      {/* Dark page whose <select> inherits a light UA background */}
      <div
        className="dark bg-background text-foreground border border-border rounded-lg p-4 space-y-3"
        style={{ colorScheme: 'light' }}
      >
        <label className="block space-y-1">
          <span className="text-xs font-medium text-muted-foreground">Environment</span>
          <select
            defaultValue="production"
            className="text-foreground w-full rounded-md p-2 text-sm"
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
            className="text-foreground w-full rounded-md p-2 text-sm"
          >
            <option value="iad1">Washington, D.C.</option>
            <option value="fra1">Frankfurt</option>
            <option value="hnd1">Tokyo</option>
          </select>
        </label>
      </div>

      <p className="text-xs text-error">
        Both selects are set to a value — you just can&apos;t read it. Light text on the
        UA&apos;s light Field background.
      </p>
    </div>
  );
}
