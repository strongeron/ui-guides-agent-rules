export function NoDeadZonesGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Preferences</h3>
        <div className="space-y-1">
          <label className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-muted cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4"
            />
            <span className="text-sm">Enable notifications</span>
          </label>
          <label className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-muted cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4"
            />
            <span className="text-sm">Subscribe to newsletter</span>
          </label>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          The entire row is clickable via the label element. Much easier to tap.
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        Label wraps checkbox + text - full row is clickable
      </p>
    </div>
  );
}
