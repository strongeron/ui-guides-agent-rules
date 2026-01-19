export function RamsAltTextGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Image with Alt Text</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop"
              alt="John Smith, Senior Developer"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">John Smith</p>
              <p className="text-sm text-muted-foreground">Senior Developer</p>
            </div>
          </div>
          <div className="bg-muted rounded p-2 font-mono text-xs">
            <code>alt="John Smith, Senior Developer"</code>
          </div>
        </div>
      </div>
      <p className="text-xs text-success">
        Screen reader announces: "John Smith, Senior Developer, image"
      </p>
    </div>
  );
}
