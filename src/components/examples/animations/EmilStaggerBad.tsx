import { useState } from 'react';

const items = ['Inbox', 'Drafts', 'Sent', 'Archive', 'Spam'];

export function EmilStaggerBad() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setLoaded((v) => !v)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        {loaded ? 'Reset' : 'Load list'}
      </button>
      <ul className="space-y-2 min-h-[12rem]">
        {loaded &&
          items.map((item) => (
            <li
              key={item}
              className="p-2 rounded-md bg-muted text-sm"
              style={{ animation: 'emilFadeSlide 300ms cubic-bezier(0.16, 1, 0.3, 1) both' }}
            >
              {item}
            </li>
          ))}
      </ul>
      <style>{`
        @keyframes emilFadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <p className="text-xs text-destructive">
        Every item animates at once; the entrance reads as a single flash
      </p>
    </div>
  );
}
