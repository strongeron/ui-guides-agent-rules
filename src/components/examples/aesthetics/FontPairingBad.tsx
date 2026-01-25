export function FontPairingBad() {
  return (
    <div className="w-full max-w-md p-6 bg-card rounded-lg">
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold font-sans">
          Build faster with AI
        </h2>
        <p className="text-lg font-sans text-muted-foreground">
          Our platform helps teams ship products 10x faster with intelligent
          automation and seamless collaboration tools.
        </p>
        <div className="flex gap-3 pt-2">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-sans text-sm">
            Get Started
          </button>
          <button className="px-4 py-2 border border-border rounded-md font-sans text-sm">
            Learn More
          </button>
        </div>
      </div>
      <p className="text-xs text-destructive mt-4">
        Same generic font for headlines and body creates flat, monotonous hierarchy
      </p>
    </div>
  );
}
