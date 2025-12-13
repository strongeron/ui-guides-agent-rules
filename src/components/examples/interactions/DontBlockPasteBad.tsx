import { useState } from 'react';

export function DontBlockPasteBad() {
  const [value, setValue] = useState('');

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    // Paste is blocked
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onPaste={handlePaste}
          placeholder="Re-enter your password"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-2 text-xs text-gray-500">
          Try pasting - it's blocked. This breaks password managers and frustrates users.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Paste blocked - breaks password managers, reduces security
      </p>
    </div>
  );
}
