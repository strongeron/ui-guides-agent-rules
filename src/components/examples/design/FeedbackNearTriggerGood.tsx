import { useState } from 'react';

export function FeedbackNearTriggerGood() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 min-h-[140px]">
        <button
          onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm inline-flex items-center gap-2"
        >
          {copied ? (
            <>
              <span>✓</span>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>Copy Link</span>
            </>
          )}
        </button>
        <p className="text-xs text-muted-foreground mt-3">Feedback appears right on the trigger — impossible to miss.</p>
      </div>
      <p className="text-xs text-success">Inline feedback on trigger — clear and immediate</p>
    </div>
  );
}
