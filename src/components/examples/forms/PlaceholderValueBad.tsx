export function PlaceholderValueBad() {
  return (
    <div className="w-full max-w-sm">
      <form className="space-y-4">
        <div>
          <label htmlFor="bad-placeholder-phone" className="block text-sm font-medium text-foreground mb-1">
            Phone Number
          </label>
          <input
            id="bad-placeholder-phone"
            type="tel"
            placeholder="Enter phone number"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="bad-placeholder-key" className="block text-sm font-medium text-foreground mb-1">
            API Key
          </label>
          <input
            id="bad-placeholder-key"
            type="text"
            placeholder="API Key"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </form>
      <p className="text-xs text-error mt-4">
        Placeholders repeat labels without showing format
      </p>
    </div>
  );
}
