import { useState } from 'react';

export function IbelickErrorPlacementBad() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-4">
      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className={`w-full mt-1 px-3 py-2 border rounded-lg ${submitted ? 'border-destructive' : ''}`}
            placeholder="you@example.com"
          />
          {submitted && (
            <p className="text-xs text-destructive mt-1">Invalid email format</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            className={`w-full mt-1 px-3 py-2 border rounded-lg ${submitted ? 'border-destructive' : ''}`}
            placeholder="••••••••"
          />
          {submitted && (
            <p className="text-xs text-destructive mt-1">Password too short</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Sign Up
        </button>
      </form>
      <p className="text-xs text-destructive">
        Errors only at field level - user may not see them if fields are scrolled away
      </p>
    </div>
  );
}
