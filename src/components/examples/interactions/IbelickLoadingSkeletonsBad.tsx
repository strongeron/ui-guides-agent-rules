import { useState, useEffect } from 'react';

export function IbelickLoadingSkeletonsBad() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center p-12 bg-muted rounded-lg">
          <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-xs text-destructive">
          Spinner gives no indication of what's loading or how long it will take
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
