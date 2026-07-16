import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingButtonsGood() {
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
          className="inline-grid place-items-center whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
        >
          {/* Idle layer — reserves width even while hidden */}
          <span
            className={`col-start-1 row-start-1 flex items-center gap-2 ${isLoading ? 'invisible' : ''}`}
          >
            Save
          </span>
          {/* Loading layer — reserves width even while hidden */}
          <span
            className={`col-start-1 row-start-1 flex items-center gap-2 ${isLoading ? '' : 'invisible'}`}
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving your changes…
          </span>
        </button>
        <span className="whitespace-nowrap text-sm text-muted-foreground">
          Draft saved 2m ago
        </span>
      </div>
      <p className="text-xs text-success">
        Both labels share one grid cell, so the button reserves the widest width — it and the text beside it never move.
      </p>
    </div>
  );
}
