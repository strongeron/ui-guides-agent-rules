import { useState } from 'react';

export function LabelActivationGood() {
  const [agreed, setAgreed] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-start gap-3">
        <input
          id="good-terms"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 w-4 h-4 text-blue-600 border-border rounded focus-visible:ring-2 focus-visible:ring-blue-500"
        />
        <label htmlFor="good-terms" className="text-sm text-foreground cursor-pointer">
          I agree to the terms and conditions
        </label>
      </div>
      <div className="flex items-start gap-3">
        <input
          id="good-newsletter"
          type="checkbox"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
          className="mt-1 w-4 h-4 text-blue-600 border-border rounded focus-visible:ring-2 focus-visible:ring-blue-500"
        />
        <label htmlFor="good-newsletter" className="text-sm text-foreground cursor-pointer">
          Subscribe to newsletter
        </label>
      </div>
      <p className="text-xs text-success">
        Click the label text to toggle checkbox
      </p>
    </div>
  );
}
