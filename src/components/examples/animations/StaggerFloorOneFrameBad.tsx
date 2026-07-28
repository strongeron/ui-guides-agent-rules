import { useState } from 'react';

const WORD = 'Cascading';
// "Subtle" was the intent. 8ms is half a frame at 60Hz, so the browser starts
// letters 1 and 2 on the same paint and the staircase never exists.
const STAGGER_MS = 8;
const DURATION_MS = 400;
const FRAME_MS = 16.7;

export function StaggerFloorOneFrameBad() {
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
        <p key={run} className="text-3xl font-semibold">
          {WORD.split('').map((char, i) => (
            <span
              key={i}
              className="floor-bad-char inline-block"
              style={{ animationDelay: `${i * STAGGER_MS}ms` }}
            >
              {char}
            </span>
          ))}
        </p>
      </div>

      <style>{`
        .floor-bad-char {
          animation: floorRise ${DURATION_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        @keyframes floorRise {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <p className="text-xs text-destructive">
        {STAGGER_MS}ms is under half a frame ({FRAME_MS}ms at 60Hz), so{' '}
        {Math.ceil(FRAME_MS / STAGGER_MS)} letters start on every paint — all{' '}
        {WORD.length} shards and {WORD.length} animations are shipped to render a flash
      </p>
    </div>
  );
}
