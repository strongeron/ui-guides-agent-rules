export function FontPairingGood() {
  return (
    <div className="w-full max-w-md p-6 bg-card rounded-lg">
      <div className="space-y-4">
        <h2
          className="text-3xl font-bold text-foreground"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Build faster with AI
        </h2>
        <p
          className="text-lg text-muted-foreground leading-relaxed"
          style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif" }}
        >
          Our platform helps teams ship products 10x faster with intelligent
          automation and seamless collaboration tools.
        </p>
        <div className="flex gap-3 pt-2">
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
            style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif" }}
          >
            Get Started
          </button>
          <button
            className="px-4 py-2 border border-border rounded-md text-sm text-foreground"
            style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif" }}
          >
            Learn More
          </button>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Display serif for headlines + clean sans for body creates clear visual hierarchy
      </p>
    </div>
  );
}
