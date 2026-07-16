import { useState } from 'react';

export function LoadingButtonsBad() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={handleClick}
          disabled={isLoading}
          className="whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
        >
          {isLoading ? 'Saving your changes…' : 'Save'}
        </button>
        <span className="whitespace-nowrap text-sm text-muted-foreground">
          Draft saved 2m ago
        </span>
      </div>
      <p className="text-xs text-error">
        Swapping the label resizes the button, shoving the text beside it. Click and watch it jump.
      </p>
    </div>
  );
}
