import { useState } from 'react';

const HERO = 'Ship faster';
const BODY = 'Every component ships with tokens, tests, and documentation.';

// The reflex: one preset, copy-pasted. The hero numbers (12px blur, 25ms
// stagger, per-character) get applied to body copy without repricing anything.
const BLUR_PX = 12;
const STAGGER_MS = 25;
const DURATION_MS = 900;

export function TextRevealScalesWithTypeBad() {
  const [run, setRun] = useState(0);

  const shards = (text: string) =>
    text.split('').map((char, i) => (
      <span
        key={i}
        className="reveal-bad-char inline-block"
        style={{ animationDelay: `${i * STAGGER_MS}ms` }}
      >
        {char}
      </span>
    ));

  return (
    <div className="space-y-4">
      <button
        onClick={() => setRun((v) => v + 1)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Replay reveal
      </button>

      <div key={run} className="space-y-3 rounded-lg bg-muted p-4 min-h-[9rem]">
        <p className="text-4xl font-semibold leading-tight whitespace-pre-wrap">{shards(HERO)}</p>
        <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-wrap">{shards(BODY)}</p>
      </div>

      <style>{`
        .reveal-bad-char {
          animation: revealBad ${DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes revealBad {
          from { opacity: 0; transform: translateY(16px); filter: blur(${BLUR_PX}px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>

      <p className="text-xs text-destructive">
        {BLUR_PX}px of blur is about two stem widths on the heading but several times the
        stem width of 16px body text — the paragraph is not softened, it is erased for most
        of the {(DURATION_MS / 1000).toFixed(1)}s it takes each letter to resolve
      </p>
    </div>
  );
}
