import { useState } from 'react';

export function EmilFrequencyGood() {
  const [liked, setLiked] = useState(false);
  const [everLiked, setEverLiked] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [count, setCount] = useState(0);

  const handleClick = () => {
    const next = !liked;
    setLiked(next);
    if (next) {
      setCount((c) => c + 1);
      // Delight, but only for the rare first-ever like.
      if (!everLiked) {
        setEverLiked(true);
        setCelebrating(true);
      }
    }
  };

  const reset = () => {
    setLiked(false);
    setEverLiked(false);
    setCelebrating(false);
    setCount(0);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        The first like gets delight. Every like after that is instant.
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={handleClick}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground"
        >
          <span
            onAnimationEnd={() => setCelebrating(false)}
            className={`text-xl leading-none transition-colors duration-100 ease-out ${
              liked ? 'text-destructive' : 'text-muted-foreground'
            }`}
            style={
              celebrating
                ? { animation: 'emilLikeCelebrate 450ms cubic-bezier(0.34, 1.56, 0.64, 1)', display: 'inline-block' }
                : undefined
            }
          >
            {liked ? '♥' : '♡'}
          </span>
          <span className="text-sm">{liked ? 'Liked' : 'Like'}</span>
        </button>
        <button
          onClick={reset}
          className="px-3 py-2 rounded-lg bg-muted/60 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Reset
        </button>
      </div>
      <p className="text-xs text-muted-foreground tabular-nums">
        Liked {count} {count === 1 ? 'time' : 'times'}
      </p>
      <style>{`
        @keyframes emilLikeCelebrate {
          0% { transform: scale(1); }
          40% { transform: scale(1.6); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
      `}</style>
      <p className="text-xs text-success">
        Delight on the rare first time, instant on every repeat — motion scaled to how often the action actually happens
      </p>
    </div>
  );
}
