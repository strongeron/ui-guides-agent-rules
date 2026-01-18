import { useState } from 'react';

export function DontBlockTypingGood() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);

    if (value && !/^\d+$/.test(value)) {
      setError('Please enter numbers only');
    } else {
      setError('');
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div>
        <label htmlFor="good-phone" className="block text-sm font-medium text-foreground mb-1">
          Phone Number
        </label>
        <input
          id="good-phone"
          type="text"
          value={phoneNumber}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
            error
              ? 'border-error/50 focus-visible:ring-error'
              : 'border-border focus-visible:ring-ring'
          }`}
          placeholder="5551234567"
        />
        {error && (
          <p className="text-xs text-error mt-1">{error}</p>
        )}
      </div>
      <p className="text-xs text-success mt-4">
        All input allowed - clear feedback about format
      </p>
    </div>
  );
}
