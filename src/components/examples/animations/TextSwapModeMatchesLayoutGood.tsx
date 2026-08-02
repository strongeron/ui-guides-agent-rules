import { useEffect, useState } from 'react';

const PHRASES = ['Built for teams', 'Made for speed'];

const EXIT_MS = 420;
const ENTER_MS = 520;
// The effect travels, so the slot does NOT hold still: exit fully, then spend
// the budget on a beat instead of an overlap.
const MICRO_DELAY_MS = 70;
const ENTER_DELAY_MS = EXIT_MS + MICRO_DELAY_MS;

export function TextSwapModeMatchesLayoutGood() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);

  useEffect(() => {
    if (leaving === null) return;
    const id = setTimeout(() => setLeaving(null), EXIT_MS);
    return () => clearTimeout(id);
  }, [leaving]);

  return (
    <div className="space-y-4">
      <button
        onClick={() => {
          setLeaving(index);
          setIndex((v) => (v + 1) % PHRASES.length);
        }}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Swap phrase
      </button>

      <div className="min-h-[6rem] flex items-center overflow-hidden rounded-lg bg-muted p-4">
        <span className="mode-good-slot text-2xl font-medium">
          {PHRASES.map((phrase, i) => (
            <span
              key={phrase}
              aria-hidden={i === index ? undefined : 'true'}
              className={
                i === index
                  ? 'mode-good-layer mode-good-enter'
                  : i === leaving
                    ? 'mode-good-layer mode-good-exit'
                    : 'mode-good-layer invisible'
              }
            >
              {phrase}
            </span>
          ))}
        </span>
      </div>

      <style>{`
        .mode-good-slot { display: inline-grid; }
        .mode-good-layer { grid-area: 1 / 1; justify-self: start; white-space: nowrap; }
        .mode-good-enter {
          animation: modeGoodEnter ${ENTER_MS}ms cubic-bezier(0.22, 1, 0.36, 1) ${ENTER_DELAY_MS}ms both;
        }
        .mode-good-exit {
          animation: modeGoodExit ${EXIT_MS}ms cubic-bezier(0.4, 0, 1, 1) both;
        }
        @keyframes modeGoodEnter {
          from { opacity: 0; transform: translateX(-48px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes modeGoodExit {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(48px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mode-good-enter, .mode-good-exit { animation: none; }
          .mode-good-exit { opacity: 0; }
        }
      `}</style>

      <p className="text-xs text-success">
        Exit finishes at {EXIT_MS}ms and the new phrase starts at {ENTER_DELAY_MS}ms — the{' '}
        {MICRO_DELAY_MS}ms beat keeps it reading as a deliberate replacement, and only one
        phrase is ever moving
      </p>
    </div>
  );
}
