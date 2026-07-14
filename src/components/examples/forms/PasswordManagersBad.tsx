import { useState } from 'react';

export function PasswordManagersBad() {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...code];
    next[index] = value.slice(-1);
    setCode(next);
  };

  const blockPaste = (e: React.ClipboardEvent) => e.preventDefault();

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-2">
        <label htmlFor="pm-bad-password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="pm-bad-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onPaste={blockPaste}
          autoComplete="off"
          className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-ring"
        />
        <p className="text-xs text-muted-foreground">Try pasting a password. It is blocked.</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Enter 2FA code</h3>
        <div className="flex gap-2 mb-2">
          {code.map((digit, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onPaste={blockPaste}
              className="w-10 h-12 text-center text-lg font-mono bg-background border border-border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-ring"
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Try pasting the code. Nothing happens.</p>
      </div>

      <p className="text-xs text-destructive">
        <code>autocomplete="off"</code> plus blocked paste locks password managers out, and the 2FA code cannot be pasted from an authenticator
      </p>
    </div>
  );
}
