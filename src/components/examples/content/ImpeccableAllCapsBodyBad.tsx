export function ImpeccableAllCapsBodyBad() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-sm uppercase leading-[1.6] text-foreground">
          The seller makes no warranty of merchantability or fitness for a particular purpose. Any
          liability arising from the use of this product is limited to the amount paid for it in the
          twelve months preceding the claim. Some jurisdictions do not allow this limitation.
        </p>
      </div>

      <p className="text-xs text-error">
        265 characters of prose set in <code className="rounded bg-muted px-1 font-mono">uppercase</code>{' '}
        — the detector fires on text-transform: uppercase on any non-heading over 30 characters. We
        recognize words by their outline: the ascenders of “l” and “h”, the descenders of “p” and
        “y”. Capitals flatten every word into the same rectangle, so you are forced to read letter
        by letter. Ironically, this is exactly the copy people set in caps to make it feel more
        legally binding.
      </p>
    </div>
  );
}
