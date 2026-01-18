import { useState } from 'react';

export function LabelActivationBad() {
  const [agreed, setAgreed] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-start gap-3">
        <input
          id="bad-terms"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 w-4 h-4 text-primary border-border rounded focus-visible:ring-2 focus-visible:ring-ring"
        />
        <span className="text-sm text-foreground">
          I agree to the terms and conditions
        </span>
      </div>
      <div className="flex items-start gap-3">
        <input
          id="bad-newsletter"
          type="checkbox"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
          className="mt-1 w-4 h-4 text-primary border-border rounded focus-visible:ring-2 focus-visible:ring-ring"
        />
        <span className="text-sm text-foreground">
          Subscribe to newsletter
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        Label text not clickable - must click small checkbox
      </p>
    </div>
  );
}
