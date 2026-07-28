import { useState } from 'react';

const LINE = 'Deploying to production…';
const STAGGER_MS = 46;
const DURATION_MS = 240;

export function HardCutUsesStepsGood() {
  const [run, setRun] = useState(0);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setRun((v) => v + 1)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Replay typing
      </button>

      <div className="min-h-[5rem] flex items-center rounded-lg bg-muted p-4">
        {/* The glyph shards are decoration; the line itself stays one string. */}
        <p key={run} className="font-mono text-lg whitespace-pre-wrap" aria-label={LINE}>
          {LINE.split('').map((char, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="type-good-char inline-block"
              style={{ animationDelay: `${i * STAGGER_MS}ms` }}
            >
              {char}
            </span>
          ))}
        </p>
      </div>

      <style>{`
        .type-good-char {
          /* steps(1, end) collapses the duration into one transition at its end:
             the glyph is struck, never half-present. */
          animation: typeGoodStep ${DURATION_MS}ms steps(1, end) both;
        }
        @keyframes typeGoodStep {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .type-good-char { animation: none; }
        }
      `}</style>

      <p className="text-xs text-success">
        Every glyph is either struck or absent — the rhythm lives entirely in the {STAGGER_MS}ms
        stagger, which is why the effect still reads as typing at any speed
      </p>
    </div>
  );
}
