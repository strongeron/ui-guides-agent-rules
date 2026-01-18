export function PlaceholderValueGood() {
  return (
    <div className="w-full max-w-sm">
      <form className="space-y-4">
        <div>
          <label htmlFor="good-placeholder-phone" className="block text-sm font-medium text-foreground mb-1">
            Phone Number
          </label>
          <input
            id="good-placeholder-phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="good-placeholder-key" className="block text-sm font-medium text-foreground mb-1">
            API Key
          </label>
          <input
            id="good-placeholder-key"
            type="text"
            placeholder="sk-proj_abc123…"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </form>
      <p className="text-xs text-success mt-4">
        Placeholders show example patterns with ellipsis
      </p>
    </div>
  );
}
