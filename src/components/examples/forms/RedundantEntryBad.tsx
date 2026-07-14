import { useState } from 'react';

const SHIPPING = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  street: '12 Marylebone Road',
  city: 'London',
  postcode: 'NW1 5LA',
};

const RETYPED_CHARS = Object.values(SHIPPING).join('').length;

const FIELDS: { key: keyof typeof SHIPPING; label: string; autoComplete: string }[] = [
  { key: 'name', label: 'Full name', autoComplete: 'name' },
  { key: 'email', label: 'Email', autoComplete: 'email' },
  { key: 'street', label: 'Street', autoComplete: 'street-address' },
  { key: 'city', label: 'City', autoComplete: 'address-level2' },
  { key: 'postcode', label: 'Postcode', autoComplete: 'postal-code' },
];

const EMPTY = { name: '', email: '', street: '', city: '', postcode: '' };

export function RedundantEntryBad() {
  const [step, setStep] = useState<1 | 2>(1);
  const [billing, setBilling] = useState(EMPTY);
  const [emailConfirm, setEmailConfirm] = useState('');

  const typed = Object.values(billing).join('').length + emailConfirm.length;

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-3">
          Step {step} of 2 — {step === 1 ? 'Shipping' : 'Billing'}
        </p>

        {step === 1 ? (
          <div className="space-y-3">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <label htmlFor={`re-bad-ship-${f.key}`} className="block text-xs font-medium text-foreground mb-1">
                  {f.label}
                </label>
                <input
                  id={`re-bad-ship-${f.key}`}
                  name={f.key}
                  autoComplete={f.autoComplete}
                  defaultValue={SHIPPING[f.key]}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              Continue to billing
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <label htmlFor={`re-bad-bill-${f.key}`} className="block text-xs font-medium text-foreground mb-1">
                  Billing {f.label.toLowerCase()}
                </label>
                <input
                  id={`re-bad-bill-${f.key}`}
                  name={`billing-${f.key}`}
                  value={billing[f.key]}
                  onChange={(e) => setBilling((b) => ({ ...b, [f.key]: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            ))}
            <div>
              <label htmlFor="re-bad-confirm" className="block text-xs font-medium text-foreground mb-1">
                Re-enter your email to confirm
              </label>
              <input
                id="re-bad-confirm"
                name="email-confirm"
                value={emailConfirm}
                onChange={(e) => setEmailConfirm(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <p className="text-xs font-mono text-muted-foreground">
              Re-typed {typed} of {RETYPED_CHARS + SHIPPING.email.length} characters you already entered
            </p>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setBilling(EMPTY);
                setEmailConfirm('');
              }}
              className="w-full px-4 py-2 text-sm border border-border rounded-lg text-foreground hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              Back to shipping
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-destructive mt-4">
        Step 2 is an empty duplicate of step 1: same five values, plus an email you must type twice. Nothing is
        auto-populated and nothing is offered for selection — SC 3.3.7 fails.
      </p>
    </div>
  );
}
