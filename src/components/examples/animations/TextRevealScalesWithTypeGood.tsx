import { Fragment, useState } from 'react';

const HERO = 'Ship faster';
const BODY = 'Every component ships with tokens, tests, and documentation.';

// Two presets, because the blur radius is absolute pixels and the stem width of
// the glyph is not. Below 24px the blur halves and the stagger tightens — and
// the unit coarsens, because smaller type means more units per line.
const HERO_PRESET = { blurPx: 12, staggerMs: 25, durationMs: 900 };
const BODY_PRESET = { blurPx: 6, staggerMs: 15, durationMs: 600 };

export function TextRevealScalesWithTypeGood() {
  const [run, setRun] = useState(0);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setRun((v) => v + 1)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Replay reveal
      </button>

      <div key={run} className="space-y-3 rounded-lg bg-muted p-4 min-h-[9rem]">
        {/* pre-wrap keeps the space characters that per-character splitting turns
            into their own collapsible inline-blocks. */}
        <p className="text-4xl font-semibold leading-tight whitespace-pre-wrap">
          <span className="sr-only">{HERO}</span>
          {HERO.split('').map((char, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="reveal-hero inline-block"
              style={{ animationDelay: `${i * HERO_PRESET.staggerMs}ms` }}
            >
              {char}
            </span>
          ))}
        </p>

        <p className="text-base leading-relaxed text-muted-foreground">
          <span className="sr-only">{BODY}</span>
          {BODY.split(' ').map((word, i, all) => (
            // Word gaps live between the tokens so the paragraph can still wrap.
            <Fragment key={i}>
              <span
                aria-hidden="true"
                className="reveal-body inline-block"
                style={{ animationDelay: `${i * BODY_PRESET.staggerMs}ms` }}
              >
                {word}
              </span>
              {i < all.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </p>
      </div>

      <style>{`
        .reveal-hero {
          animation: revealHero ${HERO_PRESET.durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .reveal-body {
          animation: revealBody ${BODY_PRESET.durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes revealHero {
          from { opacity: 0; transform: translateY(16px); filter: blur(${HERO_PRESET.blurPx}px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes revealBody {
          from { opacity: 0; transform: translateY(8px); filter: blur(${BODY_PRESET.blurPx}px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-hero, .reveal-body { animation: none; }
        }
      `}</style>

      <p className="text-xs text-success">
        {HERO_PRESET.blurPx}px / {HERO_PRESET.staggerMs}ms per character on the heading,{' '}
        {BODY_PRESET.blurPx}px / {BODY_PRESET.staggerMs}ms per word on the body — both stay
        legible the whole way through, and the paragraph resolves in a third of the time
      </p>
    </div>
  );
}
