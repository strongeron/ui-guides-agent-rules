import { useState } from 'react';

export function PasswordManagersBad() {
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    // Paste blocked
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Enter 2FA Code</h3>
        <div className="flex gap-2 mb-3">
          {code.map((digit, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onPaste={handlePaste}
              className="w-10 h-12 text-center text-lg font-mono border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Each digit is a separate input. Pasting the full code from an authenticator doesn't work.
        </p>
      </div>
      <p className="text-xs text-error mt-4">
        Can't paste 2FA code - breaks authenticator workflow
      </p>
    </div>
  );
}
