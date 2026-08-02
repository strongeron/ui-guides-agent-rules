import { useEffect, useState } from 'react';

const WORDS = ['faster', 'smarter', 'collaboratively', 'together'];

export function TextSwapOverlapBad() {
  const [i, setI] = useState(0);

  // The reflex: an interval that replaces the string. There is no exit, no
  // overlap, and no reserved slot — `transition` cannot animate a text node
  // being swapped out from under it, so the "animation" never runs at all.
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % WORDS.length), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-4">
      <div className="min-h-[7rem] flex items-center rounded-lg bg-muted p-4">
        <h3 className="text-2xl font-medium">
          Ship{' '}
          <span
            className="text-primary"
            style={{ transition: 'all 0.3s ease-in-out' }}
          >
            {WORDS[i]}
          </span>{' '}
          every day
        </h3>
      </div>

      <p className="text-xs text-destructive">
        The word hard-cuts with no overlap, and because the slot is only as wide as the
        current string, &ldquo;every day&rdquo; jumps sideways on every tick — with no way to
        pause it
      </p>
    </div>
  );
}
