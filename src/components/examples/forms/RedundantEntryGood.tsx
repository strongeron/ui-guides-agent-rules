import { useState } from 'react';

const SHIPPING = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  street: '12 Marylebone Road',
  city: 'London',
  postcode: 'NW1 5LA',
};

const FIELDS: { key: keyof typeof SHIPPING; label: string; autoComplete: string }[] = [
  { key: 'name', label: 'Full name', autoComplete: 'name' },
  { key: 'email', label: 'Email', autoComplete: 'email' },
  { key: 'street', label: 'Street', autoComplete: 'street-address' },
  { key: 'city', label: 'City', autoComplete: 'address-level2' },
  { key: 'postcode', label: 'Postcode', autoComplete: 'postal-code' },
];

const EMPTY = { name: '', email: '', street: '', city: '', postcode: '' };

export function RedundantEntryGood() {
  const [step, setStep] = useState<1 | 2>(1);
  const [shipping, setShipping] = useState(SHIPPING);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [billing, setBilling] = useState(EMPTY);

  const values = sameAsShipping ? shipping : billing;

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
                <label htmlFor={`re-good-ship-${f.key}`} className="block text-xs font-medium text-foreground mb-1">
                  {f.label}
                </label>
                <input
                  id={`re-good-ship-${f.key}`}
                  name={f.key}
                  autoComplete={f.autoComplete}
                  value={shipping[f.key]}
                  onChange={(e) => setShipping((s) => ({ ...s, [f.key]: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Continue to billing
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={sameAsShipping}
                onChange={(e) => {
                  const next = e.target.checked;
                  setSameAsShipping(next);
                  // Keep whatever was on screen as the starting point for editing.
                  if (!next) setBilling(shipping);
                }}
                className="h-4 w-4 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              Same as shipping address
            </label>

            {FIELDS.map((f) => (
              <div key={f.key}>
                <label htmlFor={`re-good-bill-${f.key}`} className="block text-xs font-medium text-foreground mb-1">
                  Billing {f.label.toLowerCase()}
                </label>
                <input
                  id={`re-good-bill-${f.key}`}
                  name={`billing-${f.key}`}
                  autoComplete={f.autoComplete}
                  value={values[f.key]}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (sameAsShipping) {
                      setSameAsShipping(false);
                      setBilling({ ...shipping, [f.key]: value });
                    } else {
                      setBilling((b) => ({ ...b, [f.key]: value }));
                    }
                  }}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            ))}
            <p className="text-xs font-mono text-muted-foreground">
              Re-typed 0 characters — every value carried forward, all still editable
            </p>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full px-4 py-2 text-sm border border-border rounded-lg text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Back to shipping
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-success mt-4">
        One checkbox auto-populates all five values, and typing in any field simply takes over. No confirmation
        email field: the address is on screen, so it can be checked instead of re-typed.
      </p>
    </div>
  );
}
