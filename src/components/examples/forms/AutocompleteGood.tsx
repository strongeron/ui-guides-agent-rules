export function AutocompleteGood() {
  return (
    <div className="w-full max-w-sm">
      <form className="space-y-4">
        <div>
          <label htmlFor="good-auto-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="good-auto-email"
            type="email"
            name="email"
            autoComplete="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="good-auto-phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            id="good-auto-phone"
            type="tel"
            name="tel"
            autoComplete="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
      <p className="text-xs text-green-700 mt-4">
        Proper autocomplete enables browser autofill.
      </p>
    </div>
  );
}
