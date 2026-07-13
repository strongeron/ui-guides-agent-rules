import { useState } from 'react';

export function EmilFrequencyBad() {
  const [liked, setLiked] = useState(false);
  const [pulse, setPulse] = useState(0);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Liking is a high-frequency action. Click it a few times.</p>
      <button
        onClick={() => {
          setLiked((v) => !v);
          setPulse((p) => p + 1);
        }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground"
      >
        <span
          key={pulse}
          className={`text-xl leading-none ${liked ? 'text-destructive' : 'text-muted-foreground'}`}
          style={{ animation: 'emilLikeBounce 400ms cubic-bezier(0.34, 1.56, 0.64, 1)', display: 'inline-block' }}
        >
          {liked ? '♥' : '♡'}
        </span>
        <span className="text-sm">{liked ? 'Liked' : 'Like'}</span>
      </button>
      <style>{`
        @keyframes emilLikeBounce {
          0% { transform: scale(1); }
          40% { transform: scale(1.6); }
          70% { transform: scale(0.85); }
          100% { transform: scale(1); }
        }
      `}</style>
      <p className="text-xs text-destructive">
        A 400ms bounce on every click turns a constant action into a nuisance
      </p>
    </div>
  );
}
