import { useState } from 'react';

export function EnterSubmitsBad() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="w-full max-w-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="bad-email" className="block text-sm font-medium text-foreground mb-1">
            Email Address
          </label>
          <input
            id="bad-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Enter your email"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          {submitted ? 'Submitted!' : 'Subscribe'}
        </button>
      </form>
      <p className="text-xs text-muted-foreground mt-4">
        Try pressing Enter - it won't submit
      </p>
    </div>
  );
}
