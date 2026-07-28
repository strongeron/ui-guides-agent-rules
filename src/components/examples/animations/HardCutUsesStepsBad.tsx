import { useState } from 'react';

const LINE = 'Deploying to production…';
const STAGGER_MS = 46;
const DURATION_MS = 240;
// 240ms of fade at a 46ms stagger means ~5 characters are half-present at once.
const GHOSTS = Math.round(DURATION_MS / STAGGER_MS);

export function HardCutUsesStepsBad() {
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
        <p key={run} className="font-mono text-lg whitespace-pre-wrap">
          {LINE.split('').map((char, i) => (
            <span
              key={i}
              className="type-bad-char inline-block"
              style={{ animationDelay: `${i * STAGGER_MS}ms` }}
            >
              {char}
            </span>
          ))}
        </p>
      </div>

      <style>{`
        .type-bad-char {
          /* An opacity ramp: every glyph spends 240ms as a ghost. */
          animation: typeBadFade ${DURATION_MS}ms ease-out both;
        }
        @keyframes typeBadFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <p className="text-xs text-destructive">
        Each character fades over {DURATION_MS}ms, so about {GHOSTS} of them are half-present
        at any moment — the line reads as a grey smear resolving, not as typing
      </p>
    </div>
  );
}
