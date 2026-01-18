import { useState } from 'react';
import { Heart } from 'lucide-react';

export function OptimisticUpdatesGood() {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    const previousState = liked;
    setLiked(!liked);

    try {
      await new Promise((resolve, reject) =>
        setTimeout(() => Math.random() > 0.2 ? resolve(true) : reject(), 1000)
      );
    } catch {
      setLiked(previousState);
      alert('Failed to update. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm mb-3">Great post about web design!</p>
        <button
          onClick={handleLike}
          className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Heart className={`w-4 h-4 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
          <span className="text-sm">{liked ? 'Liked' : 'Like'}</span>
        </button>
      </div>
      <p className="text-xs text-success mt-4">
        UI updates instantly, rolls back on error
      </p>
    </div>
  );
}
