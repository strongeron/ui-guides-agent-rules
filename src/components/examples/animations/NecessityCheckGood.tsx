import { useState } from 'react';

export function NecessityCheckGood() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium">
            A
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Project Alpha</div>
            <div className="text-xs text-muted-foreground">Updated 2h ago</div>
          </div>
          <button
            onClick={() => setLiked(!liked)}
            className={`transition-transform duration-150 ${liked ? 'scale-110' : 'scale-100'}`}
          >
            <svg
              className={`w-6 h-6 transition-colors duration-150 ${
                liked ? 'text-red-500 fill-red-500' : 'text-muted-foreground'
              }`}
              fill={liked ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Animation only on the like button - provides feedback on user interaction and creates delight.
        </p>
      </div>
      <p className="text-xs text-green-700 mt-4">
        Purposeful animation - feedback + delight on interaction
      </p>
    </div>
  );
}
