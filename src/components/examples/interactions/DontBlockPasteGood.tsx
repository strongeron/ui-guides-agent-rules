import { useState } from 'react';

export function DontBlockPasteGood() {
  const [value, setValue] = useState('');

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="new-password"
          placeholder="Re-enter your password"
          className="w-full px-3 py-2 border border-border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Paste works normally. Password managers can fill this field, improving security.
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        Paste allowed - works with password managers, better security
      </p>
    </div>
  );
}
