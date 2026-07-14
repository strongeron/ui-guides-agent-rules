/**
 * Bad: four different padding values on one box — `padding: 24px 16px 12px 16px`.
 * The content block sits visibly off-centre inside its own card: 24px of air above,
 * 12px below. Nobody chose that. It is what you get when a top value is nudged once
 * and a bottom value is nudged once and nothing ever reconciles them.
 */
export function InterfaceSymmetricalPaddingBad() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <p className="text-xs text-muted-foreground">Asymmetric padding: 24 / 16 / 12 / 16</p>

      {/* pt-6 = 24px, pr-4 = 16px, pb-3 = 12px, pl-4 = 16px */}
      <div className="rounded-xl border border-border bg-card pt-6 pr-4 pb-3 pl-4">
        <div className="rounded-md bg-muted p-3">
          <p className="text-sm font-medium text-foreground">Deploy succeeded</p>
          <p className="mt-1 text-xs text-muted-foreground">main &middot; 2 minutes ago</p>
        </div>
      </div>

      <div className="rounded-md border border-border bg-muted px-3 py-2">
        <code className="font-mono text-xs text-foreground">padding: 24px 16px 12px 16px;</code>
      </div>

      <p className="text-xs text-error">
        Twice as much space above the content as below it. The box is not centred in itself, and
        stacked next to siblings with their own private shorthand it reads as drift, not rhythm.
        Four unequal values is one of the highest-frequency tells in generated UI.
      </p>
    </div>
  );
}
