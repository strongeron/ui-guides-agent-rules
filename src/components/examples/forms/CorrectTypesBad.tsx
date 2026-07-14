export function CorrectTypesBad() {
  return (
    <div className="w-full max-w-sm">
      <form className="space-y-4">
        <div>
          <label htmlFor="bad-types-email" className="block text-sm font-medium text-foreground mb-1">
            Email
          </label>
          <input
            id="bad-types-email"
            type="text"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="bad-types-phone" className="block text-sm font-medium text-foreground mb-1">
            Phone
          </label>
          <input
            id="bad-types-phone"
            type="text"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="bad-types-amount" className="block text-sm font-medium text-foreground mb-1">
            Amount
          </label>
          <input
            id="bad-types-amount"
            type="text"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </form>
      <p className="text-xs text-error mt-4">
        Generic text type. Mobile shows standard keyboard.
      </p>
    </div>
  );
}
