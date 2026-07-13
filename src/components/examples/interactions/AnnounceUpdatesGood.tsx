import { useState } from 'react';

export function AnnounceUpdatesGood() {
  const [saved, setSaved] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const validate = () => {
    setError(email.includes('@') ? '' : 'Enter a valid email address');
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      {/* Toast */}
      <div className="bg-card border border-border rounded-lg p-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Save changes
        </button>
        <div role="status" aria-live="polite" aria-atomic="true" className="mt-4">
          {saved && (
            <div className="p-3 bg-success/20 text-success-foreground rounded-lg text-sm">
              Changes saved successfully
            </div>
          )}
        </div>
      </div>

      {/* Inline validation */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-2">
        <label htmlFor="au-good-email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="au-good-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validate}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'au-good-email-error' : undefined}
          placeholder="Type something invalid, then tab away"
          className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <div id="au-good-email-error" aria-live="polite" className="min-h-5">
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      </div>

      <p className="text-xs text-success">
        Polite <code>aria-live</code> on both halves of the rule: the toast and the inline validation message are
        announced when they appear
      </p>
    </div>
  );
}
