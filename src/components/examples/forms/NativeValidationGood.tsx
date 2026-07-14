import { useState } from 'react';

export function NativeValidationGood() {
  const [submitted, setSubmitted] = useState(false);

  // Only reached once the browser's own constraint validation has passed.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-sm">
      {/* No noValidate: required / type / min / max are checked by the browser,
          which focuses the first offending field and surfaces its own message. */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="good-native-name" className="block text-sm font-medium text-foreground mb-1">
            Full name
          </label>
          <input
            id="good-native-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue="Ada Kowalski"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="good-native-email" className="block text-sm font-medium text-foreground mb-1">
            Work email
          </label>
          <input
            id="good-native-email"
            name="email"
            type="email"
            required
            spellCheck={false}
            autoComplete="email"
            defaultValue="ada+work@example.com"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="good-native-seats" className="block text-sm font-medium text-foreground mb-1">
            Seats
          </label>
          <input
            id="good-native-seats"
            name="seats"
            type="number"
            required
            min={1}
            max={20}
            defaultValue={3}
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Create account
        </button>
      </form>
      {submitted && (
        <p className="text-xs text-success mt-2" role="status">
          Account created.
        </p>
      )}
      <p className="text-xs text-success mt-4">
        required + type=&quot;email&quot; + min/max: the plus-addressed email is accepted, Submit stays
        enabled, and clearing a field lets the browser report it. Try it.
      </p>
    </div>
  );
}
