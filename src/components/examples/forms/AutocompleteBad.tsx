export function AutocompleteBad() {
  return (
    <div className="w-full max-w-sm">
      <form className="space-y-4">
        <div>
          <label htmlFor="bad-auto-email" className="block text-sm font-medium text-foreground mb-1">
            Email
          </label>
          <input
            id="bad-auto-email"
            type="text"
            name="user_email"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="bad-auto-phone" className="block text-sm font-medium text-foreground mb-1">
            Phone
          </label>
          <input
            id="bad-auto-phone"
            type="text"
            name="phone_number"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Submit
        </button>
      </form>
      <p className="text-xs text-error mt-4">
        No autocomplete attributes. Browser can't autofill.
      </p>
    </div>
  );
}
