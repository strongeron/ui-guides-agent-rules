import { useState } from 'react';

export function EnterSubmitsGood() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="good-email" className="block text-sm font-medium text-foreground mb-1">
            Email Address
          </label>
          <input
            id="good-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {submitted ? 'Submitted!' : 'Subscribe'}
        </button>
      </form>
      <p className="text-xs text-success mt-4">
        Press Enter to submit the form
      </p>
    </div>
  );
}
