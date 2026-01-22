export function LcpHeroOptimizationBad() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Lazy-loading hero image - delays LCP */}
        <img
          src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Hero banner"
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Welcome to Our Store</h2>
          <p className="text-sm text-muted-foreground">
            Discover amazing products at great prices.
          </p>
        </div>
      </div>
      <div className="mt-4 p-3 bg-error/10 border border-error/30 rounded text-sm">
        <p className="font-medium text-error">Problems:</p>
        <ul className="text-xs text-error/80 mt-1 space-y-1 list-disc pl-4">
          <li><code>loading="lazy"</code> delays the hero image</li>
          <li>No <code>fetchpriority="high"</code> attribute</li>
          <li>No preload link in document head</li>
          <li>Browser discovers image late in rendering</li>
        </ul>
      </div>
    </div>
  );
}
