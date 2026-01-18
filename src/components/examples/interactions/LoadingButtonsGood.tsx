import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingButtonsGood() {
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
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70 transition-colors flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        Save Changes
      </button>
      <p className="text-xs text-success mt-4">
        Spinner added, text stays - no layout shift
      </p>
    </div>
  );
}
