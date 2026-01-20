import { useState } from 'react';

export function IbelickErrorPlacementGood() {
  const [submitted, setSubmitted] = useState(false);
  const errors = submitted ? ['Invalid email format', 'Password must be at least 8 characters'] : [];

  return (
    <div className="space-y-4">
      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className={`w-full mt-1 px-3 py-2 border rounded-lg ${submitted ? 'border-destructive' : ''}`}
            placeholder="you@example.com"
            aria-invalid={submitted}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            className={`w-full mt-1 px-3 py-2 border rounded-lg ${submitted ? 'border-destructive' : ''}`}
            placeholder="••••••••"
            aria-invalid={submitted}
          />
        </div>

        {errors.length > 0 && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg" role="alert">
            <p className="text-sm font-medium text-destructive">Please fix the following:</p>
            <ul className="mt-1 text-xs text-destructive list-disc list-inside">
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Sign Up
        </button>
      </form>
      <p className="text-xs text-success">
        Error summary near submit button - always visible when user clicks
      </p>
    </div>
  );
}
