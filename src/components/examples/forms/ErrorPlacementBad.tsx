import { useState } from 'react';

export function ErrorPlacementBad() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email.includes('@')) {
      setError('Please fix the errors in the form');
    } else {
      setError('');
      alert('Submitted!');
    }
  };

  return (
    <div className="w-full max-w-sm">
      {error && (
        <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg text-sm text-error">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="bad-error-name" className="block text-sm font-medium text-foreground mb-1">
            Name
          </label>
          <input
            id="bad-error-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="bad-error-email" className="block text-sm font-medium text-foreground mb-1">
            Email
          </label>
          <input
            id="bad-error-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Submit
        </button>
      </form>
      <p className="text-xs text-error mt-4">
        Error at top is vague. No focus management.
      </p>
    </div>
  );
}
