import { useState, useEffect } from 'react';

export function StableSkeletonsGood() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-sm">
        <div className="bg-muted rounded h-7 w-48 animate-pulse mb-2" />
        <div className="space-y-2">
          <div className="bg-muted rounded h-4 w-full animate-pulse" />
          <div className="bg-muted rounded h-4 w-full animate-pulse" />
          <div className="bg-muted rounded h-4 w-3/4 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-2">Article Title Goes Here</h3>
      <p className="text-sm text-muted-foreground">
        This is a longer paragraph of content that loads after the skeleton. The skeleton matched these dimensions exactly.
      </p>
      <p className="text-xs text-green-700 mt-4">
        Skeleton mirrors final content, no layout shift
      </p>
    </div>
  );
}
