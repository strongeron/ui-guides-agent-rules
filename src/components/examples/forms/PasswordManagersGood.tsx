import { useState, useRef } from 'react';

export function PasswordManagersGood() {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...code];
    next[index] = value.slice(-1);
    setCode(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  // Spread a pasted code across all six boxes instead of rejecting it.
  const handleCodePaste = (e: React.ClipboardEvent) => {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (digits.length === 0) return;
    e.preventDefault();
    const next = ['', '', '', '', '', ''];
    digits.split('').forEach((d, i) => (next[i] = d));
    setCode(next);
    inputRefs.current[Math.min(digits.length, 5)]?.focus();
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-2">
        <label htmlFor="pm-good-password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="pm-good-password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-ring"
        />
        <p className="text-xs text-muted-foreground">
          Paste works, and a password manager can fill it (use <code>new-password</code> on signup).
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Enter 2FA code</h3>
        <div className="flex gap-2 mb-2">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onPaste={handleCodePaste}
              className="w-10 h-12 text-center text-lg font-mono bg-background border border-border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-ring"
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Paste a 6-digit code. It fills every box.</p>
      </div>

      <p className="text-xs text-success">
        <code>autocomplete="current-password"</code> lets managers fill the password, paste is never blocked, and <code>one-time-code</code> lets the 2FA code paste or auto-fill from SMS
      </p>
    </div>
  );
}
