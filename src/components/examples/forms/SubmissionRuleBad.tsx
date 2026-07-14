import { useState } from 'react';

export function SubmissionRuleBad() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = email.length > 0 && password.length >= 8;

  return (
    <div className="w-full max-w-sm">
      <form className="space-y-4">
        <div>
          <label htmlFor="bad-submit-email" className="block text-sm font-medium text-foreground mb-1">
            Email
          </label>
          <input
            id="bad-submit-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="bad-submit-password" className="block text-sm font-medium text-foreground mb-1">
            Password (min 8 characters)
          </label>
          <input
            id="bad-submit-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary transition-colors"
        >
          Sign Up
        </button>
      </form>
      <p className="text-xs text-muted-foreground mt-4">
        Button pre-disabled - can't discover validation issues
      </p>
    </div>
  );
}
