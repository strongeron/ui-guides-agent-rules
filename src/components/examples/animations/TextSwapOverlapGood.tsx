import { useEffect, useState } from 'react';

const WORDS = ['faster', 'smarter', 'collaboratively', 'together'];

const EXIT_MS = 400;
const ENTER_MS = 500;
const OVERLAP_MS = 220;
// The new word starts entering before the old one has finished leaving, so no
// frame ever shows an empty slot.
const ENTER_DELAY_MS = EXIT_MS - OVERLAP_MS;
const HOLD_MS = 1600;

export function TextSwapOverlapGood() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setIndex((current) => {
        setLeaving(current);
        return (current + 1) % WORDS.length;
      });
    }, HOLD_MS + EXIT_MS);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    if (leaving === null) return;
    const id = setTimeout(() => setLeaving(null), EXIT_MS);
    return () => clearTimeout(id);
  }, [leaving]);

  return (
    <div className="space-y-4">
      <div className="min-h-[7rem] flex items-center rounded-lg bg-muted p-4">
        <h3 className="text-2xl font-medium">
          Ship{' '}
          {/* Every word lives in the SAME grid cell, so the slot is always as wide as
              the longest string and the words around it never move. */}
          <span className="swap-slot text-primary">
            {WORDS.map((word, i) => (
              <span
                key={word}
                className={
                  i === index
                    ? 'swap-layer swap-enter'
                    : i === leaving
                      ? 'swap-layer swap-exit'
                      : 'swap-layer invisible'
                }
                aria-hidden={i === index ? undefined : 'true'}
              >
                {word}
              </span>
            ))}
          </span>{' '}
          every day
        </h3>
      </div>

      <button
        onClick={() => setPlaying((v) => !v)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        {playing ? 'Pause rotation' : 'Resume rotation'}
      </button>

      <style>{`
        .swap-slot {
          display: inline-grid;
          vertical-align: bottom;
        }
        .swap-layer {
          grid-area: 1 / 1;
          justify-self: center;
        }
        .swap-enter {
          animation: swapEnter ${ENTER_MS}ms cubic-bezier(0.22, 1, 0.36, 1) ${ENTER_DELAY_MS}ms both;
        }
        .swap-exit {
          animation: swapExit ${EXIT_MS}ms cubic-bezier(0.4, 0, 1, 1) both;
        }
        @keyframes swapEnter {
          from { opacity: 0; transform: translateY(10px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes swapExit {
          from { opacity: 1; transform: translateY(0); filter: blur(0); }
          to { opacity: 0; transform: translateY(-10px); filter: blur(4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .swap-enter, .swap-exit { animation: none; }
          .swap-exit { opacity: 0; }
        }
      `}</style>

      <p className="text-xs text-success">
        The outgoing word starts leaving at 0ms and the incoming one enters at{' '}
        {ENTER_DELAY_MS}ms, so the two overlap for {OVERLAP_MS}ms — and the grid-stacked slot
        holds the width of the longest word throughout
      </p>
    </div>
  );
}
