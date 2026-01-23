export function LcpHeroOptimizationGood() {
  return (
    <div className="w-full max-w-md">
      {/* In real app, this would be in <head>:
          <link rel="preload" as="image" href="..." fetchpriority="high" /> */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Eager loading with high priority for LCP element */}
        <img
          src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="E-commerce store promotional hero showing colorful products"
          className="w-full h-48 object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={800}
          height={400}
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Welcome to Our Store</h2>
          <p className="text-sm text-muted-foreground">
            Discover amazing products at great prices.
          </p>
        </div>
      </div>
      <div className="mt-4 p-3 bg-success/10 border border-success/30 rounded text-sm">
        <p className="font-medium text-success">Best Practices:</p>
        <ul className="text-xs text-success/80 mt-1 space-y-1 list-disc pl-4">
          <li><code>loading="eager"</code> loads immediately</li>
          <li><code>fetchpriority="high"</code> prioritizes the request</li>
          <li><code>decoding="async"</code> prevents render blocking</li>
          <li>Explicit dimensions prevent layout shift</li>
        </ul>
      </div>
    </div>
  );
}
