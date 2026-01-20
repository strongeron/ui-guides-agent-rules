export function IbelickLetterSpacingGood() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">
          Hero Heading
        </h3>
        <p className="text-sm">
          This body text uses the font's default letter spacing, which the type designer optimized for readability.
        </p>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
          Call to Action
        </button>
      </div>
      <p className="text-xs text-success">
        Default letter-spacing - clean, readable, professional
      </p>
    </div>
  );
}
