import { useState } from 'react';

export function IbelickErrorPlacementBad() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-4">
      {/* Every error is parked here: far from the fields that failed AND far from the button that failed. */}
      {submitted && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg" role="alert">
          <p className="text-sm font-medium text-destructive">Please fix the following:</p>
          <ul className="mt-1 text-xs text-destructive list-disc list-inside">
            <li>Invalid email format</li>
            <li>Password must be at least 8 characters</li>
            <li>Could not reach the server</li>
          </ul>
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
        <div>
          <label className="text-sm font-medium" htmlFor="bad-email">Email</label>
          <input
            id="bad-email"
            type="email"
            className={`w-full mt-1 px-3 py-2 border rounded-lg ${submitted ? 'border-destructive' : ''}`}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="bad-password">Password</label>
          <input
            id="bad-password"
            type="password"
            className={`w-full mt-1 px-3 py-2 border rounded-lg ${submitted ? 'border-destructive' : ''}`}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Sign Up
        </button>
      </form>
      <p className="text-xs text-destructive">
        No error is where its action happened: the field errors are detached from their fields (no
        aria-describedby, no message under the input) and the submit failure is nowhere near the button.
      </p>
    </div>
  );
}
