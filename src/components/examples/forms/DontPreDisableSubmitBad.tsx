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
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            placeholder="Min 8 characters"
          />
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
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
