export function ResponsiveImagesGood() {
  // In a real app, you'd have multiple image sizes generated at build time
  const baseUrl = 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb';

  return (
    <div className="w-full max-w-md">
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Responsive image with srcset and sizes */}
        <img
          src={`${baseUrl}&w=800`}
          srcSet={`
            ${baseUrl}&w=400 400w,
            ${baseUrl}&w=800 800w,
            ${baseUrl}&w=1200 1200w
          `}
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 400px"
          alt="Developer working at a desk with multiple monitors showing code"
          className="w-full h-48 object-cover"
          width={800}
          height={533}
          loading="lazy"
          decoding="async"
        />
        <div className="p-4">
          <h3 className="font-semibold mb-2">Product Showcase</h3>
          <p className="text-sm text-muted-foreground">
            Browser selects optimal image size based on viewport and pixel density.
          </p>
        </div>
      </div>
      <div className="mt-4 p-3 bg-success/10 border border-success/30 rounded text-sm">
        <p className="font-medium text-success">Best Practices:</p>
        <ul className="text-xs text-success/80 mt-1 space-y-1 list-disc pl-4">
          <li><code>srcset</code> provides multiple image sizes</li>
          <li><code>sizes</code> tells browser expected display size</li>
          <li>Explicit <code>width</code>/<code>height</code> prevents CLS</li>
          <li>Use <code>&lt;picture&gt;</code> for WebP/AVIF with fallback</li>
          <li>Mobile gets ~100KB instead of ~400KB</li>
        </ul>
      </div>
    </div>
  );
}
