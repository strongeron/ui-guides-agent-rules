import { useState } from 'react';

/** The four values a user (or a bookmarklet, or a reading extension) may set under SC 1.4.12. */
const WCAG_TEXT_SPACING = {
  lineHeight: 1.5,
  letterSpacing: '0.12em',
  wordSpacing: '0.16em',
} as const;

export function TextSpacingOverrideBad() {
  const [overridden, setOverridden] = useState(false);

  const spacing = overridden ? WCAG_TEXT_SPACING : undefined;
  const paragraphSpacing = overridden ? { marginBottom: '2em' } : undefined;

  return (
    <div className="w-full max-w-sm">
      <button
        type="button"
        aria-pressed={overridden}
        onClick={() => setOverridden((v) => !v)}
        className="w-full mb-4 px-3 py-2 text-sm font-medium rounded-lg border border-border bg-muted text-foreground hover:bg-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        {overridden ? 'Remove user text spacing' : 'Apply user text spacing (SC 1.4.12)'}
      </button>

      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        {/* Fixed height + overflow hidden: the box cannot grow, so the text is cut. */}
        <div>
          <p className="text-xs text-muted-foreground mb-1 font-mono">height: 40px; overflow: hidden</p>
          <div
            style={{ height: 40, overflow: 'hidden', ...spacing }}
            className="w-44 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
          >
            Save and continue
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1 font-mono">height: 100px; overflow: hidden</p>
          <div
            style={{ height: 100, overflow: 'hidden', ...spacing }}
            className="rounded-lg bg-muted p-3 text-sm text-foreground"
          >
            <p style={paragraphSpacing}>
              Your plan renews on 1 August. Cancel any time before then to avoid the next charge.
            </p>
            <p>Invoices are emailed to the billing contact.</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-destructive mt-4">
        {overridden
          ? 'Text is clipped mid-line: the fixed height cannot grow, so content is lost. SC 1.4.12 fails.'
          : 'Looks fine at author spacing — turn the override on to see the content disappear.'}
      </p>
    </div>
  );
}
