import { useState } from 'react';

const WORD = 'Cascading';
// 24ms clears the 16ms one-frame floor, and the resulting total stagger is well
// inside the 500ms ceiling. Both ends of the window are satisfied.
const STAGGER_MS = 24;
const DURATION_MS = 400;
const TOTAL_STAGGER_MS = (WORD.length - 1) * STAGGER_MS;

export function StaggerFloorOneFrameGood() {
  const [run, setRun] = useState(0);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setRun((v) => v + 1)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Replay cascade
      </button>

      <div className="min-h-[6rem] flex items-center rounded-lg bg-muted p-4">
        <p key={run} className="text-3xl font-semibold" aria-label={WORD}>
          {WORD.split('').map((char, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="floor-good-char inline-block"
              style={{ animationDelay: `${i * STAGGER_MS}ms` }}
            >
              {char}
            </span>
          ))}
        </p>
      </div>

      <style>{`
        .floor-good-char {
          animation: floorRiseGood ${DURATION_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        @keyframes floorRiseGood {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .floor-good-char { animation: none; }
        }
      `}</style>

      <p className="text-xs text-success">
        {STAGGER_MS}ms is above the one-frame floor so every letter gets its own paint, and{' '}
        {TOTAL_STAGGER_MS}ms of total stagger stays inside the 500ms ceiling — a real
        staircase, not a flash
      </p>
    </div>
  );
}
