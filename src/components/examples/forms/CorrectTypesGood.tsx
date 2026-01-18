export function CorrectTypesGood() {
  return (
    <div className="w-full max-w-sm">
      <form className="space-y-4">
        <div>
          <label htmlFor="good-types-email" className="block text-sm font-medium text-foreground mb-1">
            Email
          </label>
          <input
            id="good-types-email"
            type="email"
            inputMode="email"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="good-types-phone" className="block text-sm font-medium text-foreground mb-1">
            Phone
          </label>
          <input
            id="good-types-phone"
            type="tel"
            inputMode="tel"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="good-types-amount" className="block text-sm font-medium text-foreground mb-1">
            Amount
          </label>
          <input
            id="good-types-amount"
            type="text"
            inputMode="decimal"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </form>
      <p className="text-xs text-success mt-4">
        Correct types show optimized mobile keyboards
      </p>
    </div>
  );
}
