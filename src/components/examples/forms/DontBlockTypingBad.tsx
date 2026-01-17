import { useState } from 'react';

export function DontBlockTypingBad() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div>
        <label htmlFor="bad-phone" className="block text-sm font-medium text-foreground mb-1">
          Phone Number (numbers only)
        </label>
        <input
          id="bad-phone"
          type="text"
          value={phoneNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          placeholder="5551234567"
        />
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        Try typing letters - they're blocked with no explanation
      </p>
    </div>
  );
}
