/**
 * Good: padding derived from the font size, not guessed.
 *
 * For 20px text the floor is vertical max(4, 20 * 0.3) = 6px and horizontal
 * max(8, 20 * 0.5) = 10px. We clear it comfortably with 12px / 16px — inside
 * impeccable's "ideally 12–16px" band. The second container gets padding on
 * every side, so nothing touches the boundary.
 */
export function ImpeccableCrampedPaddingGood() {
  const fontSize = 20;
  const padY = Math.max(4, fontSize * 0.3); // 6px floor -> we spend 12px
  const padX = Math.max(8, fontSize * 0.5); // 10px floor -> we spend 16px

  return (
    <div className="w-full max-w-sm space-y-4">
      <div
        className="rounded-lg border border-border bg-muted text-foreground"
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: '24px',
          padding: `${padY * 2}px ${padX * 1.6}px`,
        }}
      >
        Payment failed
      </div>

      {/* Padding on all four sides — no zeroed edges */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="text-sm font-semibold text-foreground">Retry payment</h4>
        <p className="mt-1 text-xs text-muted-foreground">
          Your card was declined by the issuing bank.
        </p>
      </div>

      <p className="text-xs text-success">
        Padding scales with type: 20px text gets {padY * 2}px vertical / {padX * 1.6}px horizontal,
        clearing the {padY}px &times; {padX}px floor. The section below is padded on all four sides.
      </p>
    </div>
  );
}
