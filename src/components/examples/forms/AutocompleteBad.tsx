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
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
      <p className="text-xs text-red-700 mt-4">
        No autocomplete attributes. Browser can't autofill.
      </p>
    </div>
  );
}
