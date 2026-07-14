import { useState } from 'react';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function TextReplacementsBad() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <label htmlFor="email-bad" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email-bad"
          type="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setValue('ada@example.com ');
              setError('');
            }}
            className="px-2.5 py-1.5 text-xs bg-muted text-foreground rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Autocomplete the address
          </button>
          <button
            type="button"
            // The raw value goes straight to the validator, trailing space and all.
            onClick={() => setError(EMAIL.test(value) ? '' : 'Enter a valid email address')}
            className="px-2.5 py-1.5 text-xs bg-primary text-primary-foreground rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Submit
          </button>
        </div>

        <p className="text-xs text-muted-foreground font-mono break-all">
          sent to validator: &quot;{value}&quot;
        </p>
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
      <p className="text-xs text-error">
        The address is correct, but a keyboard expansion appended a space — so the
        user is told their own email is invalid, with nothing visibly wrong.
      </p>
    </div>
  );
}
