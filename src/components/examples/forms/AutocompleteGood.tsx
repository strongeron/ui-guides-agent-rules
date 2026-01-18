export function AutocompleteGood() {
  return (
    <div className="w-full max-w-sm">
      <form className="space-y-4">
        <div>
          <label htmlFor="good-auto-email" className="block text-sm font-medium text-foreground mb-1">
            Email
          </label>
          <input
            id="good-auto-email"
            type="email"
            name="email"
            autoComplete="email"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="good-auto-phone" className="block text-sm font-medium text-foreground mb-1">
            Phone
          </label>
          <input
            id="good-auto-phone"
            type="tel"
            name="tel"
            autoComplete="tel"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Submit
        </button>
      </form>
      <p className="text-xs text-success mt-4">
        Proper autocomplete enables browser autofill.
      </p>
    </div>
  );
}
