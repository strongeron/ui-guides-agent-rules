export function ImpeccableAllCapsBodyGood() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-card p-4">
        {/* The legitimate use: a SHORT label, with tracking added back */}
        <p className="mb-2 text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
          Limitation of liability
        </p>
        <p className="text-sm leading-[1.6] text-foreground">
          The seller makes no warranty of merchantability or fitness for a particular purpose. Any
          liability arising from the use of this product is limited to the amount paid for it in the
          twelve months preceding the claim. Some jurisdictions do not allow this limitation.
        </p>
      </div>

      <p className="text-xs text-success">
        The disclaimer drops to sentence case, so word shapes come back and it can be skimmed. The
        eyebrow above it stays uppercase — that is the legitimate use: short labels and headings.
        Note it also carries{' '}
        <code className="rounded bg-muted px-1 font-mono">letter-spacing: 0.08em</code>. Capitals
        are drawn to sit next to lowercase letters, so at default tracking they crowd each other;
        short all-caps labels need 5–12% extra spacing to breathe.
      </p>
    </div>
  );
}
