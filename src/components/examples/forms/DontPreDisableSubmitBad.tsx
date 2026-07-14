import { useState } from 'react';

export function DontPreDisableSubmitBad() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = email.includes('@') && password.length >= 8;

  return (
    <div className="w-full max-w-sm">
      <form className="space-y-4">
        <div>
          <label htmlFor="bad-disable-email" className="block text-sm font-medium text-foreground mb-1">
            Email
          </label>
          <input
            id="bad-disable-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="bad-disable-password" className="block text-sm font-medium text-foreground mb-1">
            Password
          </label>
          <input
            id="bad-disable-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Min 8 characters"
          />
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:bg-muted disabled:cursor-not-allowed"
        >
          Sign Up
        </button>
      </form>
      <p className="text-xs text-error mt-4">
        Submit button is disabled until valid. Users can't discover what's wrong.
      </p>
    </div>
  );
}
