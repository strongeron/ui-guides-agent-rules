import { useState } from 'react';

/** The four values a user (or a bookmarklet, or a reading extension) may set under SC 1.4.12. */
const WCAG_TEXT_SPACING = {
  lineHeight: 1.5,
  letterSpacing: '0.12em',
  wordSpacing: '0.16em',
} as const;

export function TextSpacingOverrideGood() {
  const [overridden, setOverridden] = useState(false);

  const spacing = overridden ? WCAG_TEXT_SPACING : undefined;
  const paragraphSpacing = overridden ? { marginBottom: '2em' } : undefined;

  return (
    <div className="w-full max-w-sm">
      <button
        type="button"
        aria-pressed={overridden}
        onClick={() => setOverridden((v) => !v)}
        className="w-full mb-4 px-3 py-2 text-sm font-medium rounded-lg border border-border bg-muted text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {overridden ? 'Remove user text spacing' : 'Apply user text spacing (SC 1.4.12)'}
      </button>

      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        {/* min-height + padding: the box grows with its text instead of cropping it. */}
        <div>
          <p className="text-xs text-muted-foreground mb-1 font-mono">min-height: 40px; padding: 8px 12px</p>
          <div
            style={{ minHeight: 40, ...spacing }}
            className="w-44 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
          >
            Save and continue
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1 font-mono">min-height: 100px; padding: 12px</p>
          <div
            style={{ minHeight: 100, ...spacing }}
            className="rounded-lg bg-muted p-3 text-sm text-foreground"
          >
            <p style={paragraphSpacing}>
              Your plan renews on 1 August. Cancel any time before then to avoid the next charge.
            </p>
            <p>Invoices are emailed to the billing contact.</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-success mt-4">
        {overridden
          ? 'Every word survives: the containers grew to fit line-height 1.5, letter-spacing 0.12em, word-spacing 0.16em, and 2em between paragraphs.'
          : 'Same content, sized with min-height — turn the override on and nothing is lost.'}
      </p>
    </div>
  );
}
