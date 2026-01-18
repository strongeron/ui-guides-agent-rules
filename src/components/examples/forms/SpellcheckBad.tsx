export function SpellcheckBad() {
  return (
    <div className="w-full max-w-sm">
      <form className="space-y-4">
        <div>
          <label htmlFor="bad-spell-email" className="block text-sm font-medium text-foreground mb-1">
            Email Address
          </label>
          <input
            id="bad-spell-email"
            type="email"
            defaultValue="john.doe@exmple.com"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="bad-spell-code" className="block text-sm font-medium text-foreground mb-1">
            API Key
          </label>
          <input
            id="bad-spell-code"
            type="text"
            defaultValue="sk_test_abc123xyz"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </form>
      <p className="text-xs text-error mt-4">
        Spellcheck enabled shows red underlines on valid input
      </p>
    </div>
  );
}
