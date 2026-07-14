import { useState } from 'react';

// A hand-rolled "is this an email" regex. Like most of them, it is wrong:
// it rejects the perfectly valid plus-addressing that ada+work@example.com uses.
const EMAIL_RE = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.(com|org|net)$/;

export function NativeValidationBad() {
  const [name, setName] = useState('Ada Kowalski');
  const [email, setEmail] = useState('ada+work@example.com');
  const [error, setError] = useState('Enter a valid email address');

  // Only runs on keyup, so autofill, mouse-paste and programmatic fills
  // never re-validate and the error just sits there.
  const validateOnKeyUp = (value: string) => {
    setError(EMAIL_RE.test(value) ? '' : 'Enter a valid email address');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (error) return; // submission silently blocked by our own bad check
    alert('Account created');
  };

  return (
    <div className="w-full max-w-sm">
      {/* noValidate switches off every constraint the browser would have checked for free. */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="bad-native-name" className="block text-sm font-medium text-foreground mb-1">
            Full name
          </label>
          <input
            id="bad-native-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="bad-native-email" className="block text-sm font-medium text-foreground mb-1">
            Work email
          </label>
          <input
            id="bad-native-email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyUp={(e) => validateOnKeyUp(e.currentTarget.value)}
            className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              error ? 'border-error/50' : 'border-border'
            }`}
          />
          {error && <p className="text-xs text-error mt-1">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Create account
        </button>
      </form>
      <p className="text-xs text-error mt-4">
        noValidate plus a hand-rolled regex: a valid address is rejected, the empty-name case is
        never caught, and Submit does nothing at all.
      </p>
    </div>
  );
}
