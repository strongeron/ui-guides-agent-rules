import { useState } from 'react';

export function IbelickErrorPlacementGood() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-4">
      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
        {/* Field error -> next to the field. That is where that action happened. */}
        <div>
          <label className="text-sm font-medium" htmlFor="good-email">Email</label>
          <input
            id="good-email"
            type="email"
            className={`w-full mt-1 px-3 py-2 border rounded-lg ${submitted ? 'border-destructive' : ''}`}
            placeholder="you@example.com"
            aria-invalid={submitted || undefined}
            aria-describedby={submitted ? 'good-email-error' : undefined}
          />
          {submitted && (
            <p id="good-email-error" className="text-xs text-destructive mt-1">
              Invalid email format
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="good-password">Password</label>
          <input
            id="good-password"
            type="password"
            className={`w-full mt-1 px-3 py-2 border rounded-lg ${submitted ? 'border-destructive' : ''}`}
            placeholder="••••••••"
            aria-invalid={submitted || undefined}
            aria-describedby={submitted ? 'good-password-error' : undefined}
          />
          {submitted && (
            <p id="good-password-error" className="text-xs text-destructive mt-1">
              Password must be at least 8 characters
            </p>
          )}
        </div>

        {/* Submit-level error (the request failed) -> next to the button. That is where THAT action happened. */}
        {submitted && (
          <p className="text-sm text-destructive" role="alert">
            Could not reach the server. Nothing was saved — try again.
          </p>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Sign Up
        </button>
      </form>
      <p className="text-xs text-success">
        Each error sits next to where its action happened: field errors on their fields (wired with
        aria-describedby), the submit failure by the button.
      </p>
    </div>
  );
}
