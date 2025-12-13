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
          <label htmlFor="bad-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="bad-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {submitted ? 'Submitted!' : 'Subscribe'}
        </button>
      </form>
      <p className="text-xs text-gray-500 mt-4">
        Try pressing Enter - it won't submit
      </p>
    </div>
  );
}
