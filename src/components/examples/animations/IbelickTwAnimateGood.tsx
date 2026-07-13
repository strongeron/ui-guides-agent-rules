import { useState } from 'react';

export function IbelickTwAnimateGood() {
  const [replay, setReplay] = useState(0);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setReplay((v) => v + 1)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Replay
      </button>
      <div
        key={replay}
        className="p-4 bg-muted rounded-lg text-sm animate-in fade-in slide-in-from-bottom-2 duration-300"
      >
        tw-animate-css utility (fill-mode handled)
      </div>
      <p className="text-xs text-success">
        A ready-made utility handles <code>fill-mode</code> and easing — no flash, no custom keyframes to maintain
      </p>
    </div>
  );
}
