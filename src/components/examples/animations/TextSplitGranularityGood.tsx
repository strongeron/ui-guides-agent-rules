import { Fragment, useState } from 'react';

const HEADLINE = 'Design systems that scale with your whole team';

// 45 characters is past the ~40 mark where a per-letter cascade stops being a
// reveal, so the unit becomes the word. Fewer units means the per-unit stagger
// goes UP (70ms, not 25ms) and the whole thing still lands under a second.
const WORDS = HEADLINE.split(' ');
const STAGGER_MS = 70;
const DURATION_MS = 700;
const TOTAL_MS = (WORDS.length - 1) * STAGGER_MS + DURATION_MS;

export function TextSplitGranularityGood() {
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
        {/* The split shards are decoration; the accessibility tree gets one string. */}
        <h3 key={run} className="text-2xl font-medium leading-snug">
          <span className="sr-only">{HEADLINE}</span>
          {WORDS.map((word, i) => (
            // The gap is a text node BETWEEN the tokens, not inside one: a trailing
            // space at the end of an inline-block is collapsed away, and the headline
            // silently loses its word spacing.
            <Fragment key={i}>
              <span
                aria-hidden="true"
                className="split-good-word inline-block"
                style={{ animationDelay: `${i * STAGGER_MS}ms` }}
              >
                {word}
              </span>
              {i < WORDS.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </h3>
      </div>

      <style>{`
        .split-good-word {
          animation: splitGoodIn ${DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes splitGoodIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .split-good-word { animation: none; }
        }
      `}</style>

      <p className="text-xs text-success">
        {WORDS.length} words × {STAGGER_MS}ms — the cascade keeps its rhythm and completes in{' '}
        {(TOTAL_MS / 1000).toFixed(2)}s, while the reader still gets one intact heading
      </p>
    </div>
  );
}
