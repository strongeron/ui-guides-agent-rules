import { useEffect, useState } from 'react';

const PHRASES = ['Built for teams', 'Made for speed'];

const EXIT_MS = 420;
const ENTER_MS = 520;
// "Always overlap a swap" — applied to an effect that TRAVELS 48px. The two
// phrases are now in the same space on opposite vectors.
const OVERLAP_MS = 240;
const ENTER_DELAY_MS = EXIT_MS - OVERLAP_MS;

export function TextSwapModeMatchesLayoutBad() {
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
        <span className="mode-bad-slot text-2xl font-medium">
          {PHRASES.map((phrase, i) => (
            <span
              key={phrase}
              className={
                i === index
                  ? 'mode-bad-layer mode-bad-enter'
                  : i === leaving
                    ? 'mode-bad-layer mode-bad-exit'
                    : 'mode-bad-layer invisible'
              }
            >
              {phrase}
            </span>
          ))}
        </span>
      </div>

      <style>{`
        .mode-bad-slot { display: inline-grid; }
        .mode-bad-layer { grid-area: 1 / 1; justify-self: start; white-space: nowrap; }
        .mode-bad-enter {
          animation: modeBadEnter ${ENTER_MS}ms cubic-bezier(0.22, 1, 0.36, 1) ${ENTER_DELAY_MS}ms both;
        }
        .mode-bad-exit {
          animation: modeBadExit ${EXIT_MS}ms cubic-bezier(0.4, 0, 1, 1) both;
        }
        @keyframes modeBadEnter {
          from { opacity: 0; transform: translateX(-48px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes modeBadExit {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(48px); }
        }
      `}</style>

      <p className="text-xs text-destructive">
        Both phrases travel, so the {OVERLAP_MS}ms overlap sends them through the same space on
        opposite vectors — the glyphs interleave and the swap reads as a glitch, worse than
        the hard cut it was meant to avoid
      </p>
    </div>
  );
}
