export function MinFontWeightBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-thin text-foreground">Account Settings</h3>
        <p className="text-sm font-extralight text-muted-foreground">Manage your profile, security preferences, and notification settings.</p>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 text-sm font-light border border-border rounded text-foreground">Cancel</button>
          <button className="px-3 py-1.5 text-sm font-light bg-primary text-primary-foreground rounded">Save</button>
        </div>
      </div>
      <p className="text-xs text-error">Font weights below 400 — poor readability, especially on low-res screens</p>
    </div>
  );
}
