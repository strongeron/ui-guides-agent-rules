export function OfficialPluginsGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Official Plugins</h4>
        <div className="space-y-4">
          <div className="p-3 bg-muted rounded-lg">
            <h5 className="text-sm font-medium mb-2">@tailwindcss/typography</h5>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                Beautifully styled prose content with one class.
              </p>
            </div>
            <code className="text-xs bg-background px-1 rounded mt-2 inline-block">prose dark:prose-invert</code>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h5 className="text-sm font-medium mb-2">@tailwindcss/forms</h5>
            <input
              type="text"
              placeholder="Normalized form styles"
              className="w-full text-sm"
            />
            <code className="text-xs bg-background px-1 rounded mt-2 inline-block">form-input (auto-applied)</code>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h5 className="text-sm font-medium mb-2">@tailwindcss/container-queries</h5>
            <code className="text-xs bg-background px-1 rounded">@container @lg:flex</code>
          </div>
        </div>
      </div>
      <p className="text-xs text-success">
        Official plugins are tested, documented, and follow conventions
      </p>
    </div>
  );
}
