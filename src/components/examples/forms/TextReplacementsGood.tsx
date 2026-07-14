import { useState } from 'react';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function TextReplacementsGood() {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <label htmlFor="email-good" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email-good"
          type="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          // Trim on blur, not on change — trimming mid-typing would eat the space
          // the moment a user types it, which fights anyone entering a display name.
          onBlur={(e) => setValue(e.target.value.trim())}
          className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setValue('ada@example.com ');
              setStatus('');
            }}
            className="px-2.5 py-1.5 text-xs bg-muted text-foreground rounded-md hover:bg-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            Autocomplete the address
          </button>
          <button
            type="button"
            onClick={() => {
              const clean = value.trim();
              setValue(clean);
              setStatus(EMAIL.test(clean) ? 'Address accepted' : 'Enter a valid email address');
            }}
            className="px-2.5 py-1.5 text-xs bg-primary text-primary-foreground rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            Submit
          </button>
        </div>

        <p className="text-xs text-muted-foreground font-mono break-all">
          sent to validator: &quot;{value.trim()}&quot;
        </p>
        {status && (
          <p className={status === 'Address accepted' ? 'text-xs text-success' : 'text-xs text-error'}>
            {status}
          </p>
        )}
      </div>
      <p className="text-xs text-success">
        The value is trimmed before validation, so invisible whitespace never
        becomes the user&apos;s problem.
      </p>
    </div>
  );
}
