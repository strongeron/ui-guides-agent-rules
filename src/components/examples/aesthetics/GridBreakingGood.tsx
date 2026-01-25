export function GridBreakingGood() {
  return (
    <div className="w-full max-w-lg p-6 bg-card rounded-lg">
      <h3 className="text-sm font-medium mb-4">Our Features</h3>
      <div className="relative h-56">
        {/* Featured large card - breaks the grid with dominant size */}
        <div
          className="absolute bg-primary/10 border border-primary/20 rounded-xl p-4"
          style={{ top: 0, left: 0, width: '55%', height: '75%' }}
        >
          <div className="text-2xl mb-2">🚀</div>
          <h4 className="text-sm font-medium mb-1">Fast Performance</h4>
          <p className="text-xs text-muted-foreground leading-snug">
            Optimized for speed and efficiency across all devices
          </p>
        </div>

        {/* Offset card - creates diagonal flow */}
        <div
          className="absolute bg-accent/15 border border-accent/25 rounded-lg p-3 shadow-md"
          style={{ top: '8%', right: 0, width: '42%', height: '45%' }}
        >
          <div className="text-xl mb-1">🔒</div>
          <h4 className="text-xs font-medium mb-0.5">Secure by Default</h4>
          <p className="text-[10px] text-muted-foreground leading-tight">
            Enterprise-grade security built into every layer
          </p>
        </div>

        {/* Overlapping card - adds depth and breaks alignment */}
        <div
          className="absolute bg-muted rounded-lg p-3 shadow-lg"
          style={{ bottom: 0, right: '5%', width: '50%', height: '40%', zIndex: 10 }}
        >
          <div className="text-xl mb-1">⚡</div>
          <h4 className="text-xs font-medium mb-0.5">Easy Integration</h4>
          <p className="text-[10px] text-muted-foreground leading-tight">
            Connect with your existing tools in minutes
          </p>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Varied sizes, diagonal flow, and overlap create visual interest
      </p>
    </div>
  );
}
