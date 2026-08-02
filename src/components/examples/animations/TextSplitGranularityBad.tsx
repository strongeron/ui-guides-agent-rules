import { useState } from 'react';

const HEADLINE = 'Design systems that scale with your whole team';

// The reflex: split on '', multiply the index by a delay, ship it.
const CHARS = HEADLINE.split('');
const STAGGER_MS = 60;
const DURATION_MS = 700;
const TOTAL_MS = (CHARS.length - 1) * STAGGER_MS + DURATION_MS;

export function TextSplitGranularityBad() {
  const [run, setRun] = useState(0);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setRun((v) => v + 1)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Replay reveal
      </button>

      <div className="min-h-[7rem] rounded-lg bg-muted p-4">
        <h3 key={run} className="text-2xl font-medium leading-snug whitespace-pre-wrap">
          {CHARS.map((char, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                animation: `splitBadIn ${DURATION_MS}ms cubic-bezier(0.68, -0.55, 0.27, 1.55) both`,
                animationDelay: `${i * STAGGER_MS}ms`,
              }}
            >
              {char}
            </span>
          ))}
        </h3>
      </div>

      <style>{`
        @keyframes splitBadIn {
          from { opacity: 0; transform: translateY(24px) scale(0.8); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <p className="text-xs text-destructive">
        {CHARS.length} characters × {STAGGER_MS}ms = the last letter starts at{' '}
        {(CHARS.length - 1) * STAGGER_MS}ms and the headline is still assembling{' '}
        {(TOTAL_MS / 1000).toFixed(1)}s in — long after it has been read
      </p>
    </div>
  );
}
