import { useState, useEffect } from 'react';

export function SkeletonDimensionsGood() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {!loaded ? (
          // Skeleton matches actual content dimensions
          <div>
            {/* Image placeholder with matching aspect ratio */}
            <div className="w-full h-40 bg-muted animate-pulse" />
            <div className="p-4">
              {/* Title: matches text-lg (h-6) */}
              <div className="h-6 bg-muted rounded w-3/4 animate-pulse mb-2" />
              {/* Description: 2 lines matching text-sm */}
              <div className="h-4 bg-muted rounded animate-pulse mb-1" />
              <div className="h-4 bg-muted rounded w-5/6 animate-pulse mb-3" />
              {/* Price and button row */}
              <div className="flex items-center justify-between">
                <div className="h-7 w-16 bg-muted rounded animate-pulse" />
                <div className="h-8 w-24 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        ) : (
          // Actual content
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
      <div className="mt-4 p-3 bg-success/10 border border-success/30 rounded text-sm">
        <p className="font-medium text-success">No layout shift!</p>
        <ul className="text-xs text-success/80 mt-1 space-y-1 list-disc pl-4">
          <li>Skeleton height matches final content</li>
          <li>Image placeholder has same h-40</li>
          <li>Text lines match typography sizes</li>
          <li>CLS score stays near zero</li>
        </ul>
        <button
          onClick={() => setLoaded(false)}
          className="mt-2 text-xs text-success underline"
        >
          Reset demo
        </button>
      </div>
    </div>
  );
}
