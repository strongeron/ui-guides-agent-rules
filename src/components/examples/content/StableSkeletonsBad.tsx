import { useState, useEffect } from 'react';

export function StableSkeletonsBad() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-sm">
        <div className="bg-muted rounded h-4 w-32 animate-pulse mb-2" />
        <div className="bg-muted rounded h-3 w-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-2">Article Title Goes Here</h3>
      <p className="text-sm text-muted-foreground">
        This is a longer paragraph of content that loads after the skeleton. The height difference causes layout shift.
      </p>
      <p className="text-xs text-error mt-4">
        Skeleton dimensions don't match, causing layout shift
      </p>
    </div>
  );
}
