import { useState } from 'react';
import { Heart } from 'lucide-react';

export function OptimisticUpdatesBad() {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLiked(!liked);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm mb-3">Great post about web design!</p>
        <button
          onClick={handleLike}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
          <span className="text-sm">{loading ? 'Loading...' : liked ? 'Liked' : 'Like'}</span>
        </button>
      </div>
      <p className="text-xs text-red-700 mt-4">
        User waits 1s for server response before seeing feedback
      </p>
    </div>
  );
}
