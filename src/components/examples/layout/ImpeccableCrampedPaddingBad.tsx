/**
 * Bad: padding hardcoded independently of the type size.
 *
 * 1. The alert renders 20px text inside `padding: 2px 4px`. The threshold is
 *    vertical >= max(4, 20 * 0.3) = 6px and horizontal >= max(8, 20 * 0.5) = 10px.
 *    Both fail — the glyphs press against the border.
 * 2. The section below uses the classic `padding: 28px 0 0` shorthand bug:
 *    someone set the top and silently zeroed the sides, so the heading and the
 *    body text sit flush against the left border.
 */
export function ImpeccableCrampedPaddingBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      {/* 20px text, 2px/4px padding */}
      <div
        className="rounded-lg border border-error bg-muted text-foreground"
        style={{ fontSize: '20px', lineHeight: '24px', padding: '2px 4px' }}
      >
        Payment failed
      </div>

      {/* padding: 28px 0 0 — sides zeroed */}
      <div
        className="rounded-lg border border-border bg-card"
        style={{ padding: '28px 0 0' }}
      >
        <h4 className="text-sm font-semibold text-foreground">Retry payment</h4>
        <p className="mt-1 pb-4 text-xs text-muted-foreground">
          Your card was declined by the issuing bank.
        </p>
      </div>

      <p className="text-xs text-error">
        20px text in <code>padding: 2px 4px</code> needs at least 6px vertical and 10px horizontal
        &mdash; it has neither. Below it, <code>padding: 28px 0 0</code> leaves the text flush
        against the left border.
      </p>
    </div>
  );
}
