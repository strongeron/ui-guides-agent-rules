export function SpellcheckGood() {
  return (
    <div className="w-full max-w-sm">
      <form className="space-y-4">
        <div>
          <label htmlFor="good-spell-email" className="block text-sm font-medium text-foreground mb-1">
            Email Address
          </label>
          <input
            id="good-spell-email"
            type="email"
            spellCheck={false}
            defaultValue="john.doe@exmple.com"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="good-spell-code" className="block text-sm font-medium text-foreground mb-1">
            API Key
          </label>
          <input
            id="good-spell-code"
            type="text"
            spellCheck={false}
            defaultValue="sk_test_abc123xyz"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="good-spell-message" className="block text-sm font-medium text-foreground mb-1">
            Message (spellcheck enabled)
          </label>
          <textarea
            id="good-spell-message"
            spellCheck={true}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Write your message here..."
          />
        </div>
      </form>
      <p className="text-xs text-success mt-4">
        Spellcheck disabled for technical fields, enabled for prose
      </p>
    </div>
  );
}
