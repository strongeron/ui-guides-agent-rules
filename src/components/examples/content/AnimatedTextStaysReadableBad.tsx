import { useState } from 'react';

export function AnimatedTextStaysReadableBad() {
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
      {/* Each letter is its own span with no accessible name on the word. */}
      <p className="text-2xl font-semibold text-foreground">
        {word.split('').map((ch, i) => (
          <span
            key={i}
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
      </p>
      <p className="mt-3 text-xs text-muted-foreground">
        Screen reader gets:{' '}
        <span className="font-mono text-destructive">{word.split('').join(' · ')}</span>
      </p>
      <p className="mt-2 text-xs text-destructive">
        Ten bare spans, no wrapper name: with per-letter animation the word can be read as fragments — or dropped.
      </p>
    </div>
  );
}
