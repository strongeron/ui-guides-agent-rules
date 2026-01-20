import { useState, useEffect } from 'react';

export function IbelickLoadingSkeletonsGood() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-4 p-4 bg-muted rounded-lg animate-pulse">
          <div className="size-12 bg-muted-foreground/20 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted-foreground/20 rounded w-1/3" />
            <div className="h-3 bg-muted-foreground/20 rounded w-1/2" />
          </div>
        </div>
        <p className="text-xs text-success">
          Skeleton shows content structure - reduces perceived load time
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 p-4 bg-muted rounded-lg">
        <div className="size-12 bg-primary/20 rounded-full" />
        <div className="flex-1">
          <p className="font-medium">John Doe</p>
          <p className="text-sm text-muted-foreground">Software Engineer</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Content loaded</p>
    </div>
  );
}
