import { useState } from 'react';

export function AnimatedTextStaysReadableGood() {
  const [play, setPlay] = useState(true);
  const word = 'Announcing';
  const replay = () => {
    setPlay(false);
    requestAnimationFrame(() => setPlay(true));
  };
  return (
    <div className="w-full max-w-sm py-6">
      <button
        onClick={replay}
        className="mb-3 rounded bg-muted px-2 py-1 text-xs text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Replay
      </button>
      {/* The wrapper carries the real word; the animated shards are hidden from AT. */}
      <p className="text-2xl font-semibold text-foreground">
        <span aria-label={word}>
          {word.split('').map((ch, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="inline-block motion-safe:transition-all motion-safe:duration-500"
              style={{
                opacity: play ? 1 : 0,
                transform: play ? 'translateY(0)' : 'translateY(8px)',
                transitionDelay: `${i * 45}ms`,
              }}
            >
              {ch}
            </span>
          ))}
        </span>
      </p>
      <p className="mt-3 text-xs text-muted-foreground">
        Screen reader gets:{' '}
        <span className="font-mono text-success">{word}</span>
      </p>
      <p className="mt-2 text-xs text-success">
        aria-label carries “Announcing” as one word; the per-letter shards are aria-hidden. Same animation, intact semantics.
      </p>
    </div>
  );
}
