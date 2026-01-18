import { useState } from 'react';

export function LoadingButtonsBad() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="w-full max-w-sm">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-70 transition-colors"
      >
        {isLoading ? 'Loading...' : 'Save Changes'}
      </button>
      <p className="text-xs text-muted-foreground mt-4">
        Button text changes - causes layout shift
      </p>
    </div>
  );
}
