export function NoDeadZonesBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="bad-notifications"
              className="w-4 h-4"
            />
            <span className="text-sm">Enable notifications</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="bad-newsletter"
              className="w-4 h-4"
            />
            <span className="text-sm">Subscribe to newsletter</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Only the tiny checkbox is clickable. The text next to it doesn't activate the control.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Only 16px checkbox is clickable - hard to tap
      </p>
    </div>
  );
}
