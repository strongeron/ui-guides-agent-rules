import { useState, useEffect } from 'react';

export function SkeletonDimensionsBad() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {!loaded ? (
          // Skeleton with wrong dimensions
          <div className="p-4">
            <div className="h-8 bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 bg-muted rounded animate-pulse" />
          </div>
        ) : (
          // Actual content is much larger
          <>
            <img
              src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Black premium wireless headphones with cushioned ear cups"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Premium Headphones</h3>
              <p className="text-sm text-muted-foreground mb-3">
                High-quality wireless headphones with active noise cancellation
                and 30-hour battery life.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">$299</span>
                <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mt-4 p-3 bg-error/10 border border-error/30 rounded text-sm">
        <p className="font-medium text-error">Watch the layout shift!</p>
        <ul className="text-xs text-error/80 mt-1 space-y-1 list-disc pl-4">
          <li>Skeleton is ~50px, content is ~280px</li>
          <li>No image placeholder in skeleton</li>
          <li>CLS score will be very poor</li>
          <li>Content below jumps down when loaded</li>
        </ul>
        <button
          onClick={() => setLoaded(false)}
          className="mt-2 text-xs text-error underline"
        >
          Reset demo
        </button>
      </div>
    </div>
  );
}
