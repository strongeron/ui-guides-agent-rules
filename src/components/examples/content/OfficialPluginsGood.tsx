export function OfficialPluginsGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-1">Load plugins from CSS with @plugin</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Next to the import at the top of your stylesheet. No config file involved.
        </p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`@import "tailwindcss";

@plugin "@tailwindcss/typography";
@plugin "@tailwindcss/forms";`}</pre>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <h5 className="text-sm font-medium">What each one still earns its place for</h5>

        <div className="p-3 bg-muted rounded-lg">
          <p className="text-xs font-medium mb-1">@tailwindcss/typography</p>
          <p className="text-xs text-muted-foreground">
            The <code className="font-mono">prose</code> classes — still the right answer for markdown and CMS output
            whose markup you do not control.
          </p>
        </div>

        <div className="p-3 bg-muted rounded-lg">
          <p className="text-xs font-medium mb-1">@tailwindcss/forms</p>
          <input
            type="text"
            placeholder="Normalized native controls"
            className="w-full mt-1 px-3 py-2 text-sm rounded border border-border bg-background"
          />
        </div>

        <div className="p-3 bg-muted rounded-lg">
          <p className="text-xs font-medium mb-1">Container queries — no plugin</p>
          <div className="font-mono text-xs mt-1">
            <code className="bg-background px-1.5 py-0.5 rounded">@container</code>{' '}
            <code className="bg-background px-1.5 py-0.5 rounded">@md:flex-row</code>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Core since v4. Nothing to install.</p>
        </div>
      </div>

      <p className="text-xs text-success">
        Before adding any plugin to a v4 project, check whether core already does it.
      </p>
    </div>
  );
}
