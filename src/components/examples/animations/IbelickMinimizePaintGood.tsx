import { blockMainThread } from '@/lib/demo';

const cards = Array.from({ length: 8 }, (_, i) => i);

export function IbelickMinimizePaintGood() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Click "Run heavy task" and watch the cards.</p>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((i) => (
          <div key={i} className="relative h-12 rounded-md bg-primary">
            {/* Pre-painted shadow, crossfaded with opacity (compositor). */}
            <div
              className="absolute inset-0 rounded-md shadow-[0_8px_24px_4px_rgba(0,0,0,0.5)]"
              style={{ animation: 'shadowFade 1.2s ease-in-out infinite alternate' }}
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => blockMainThread(800)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Run heavy task (0.8s)
      </button>
      <style>{`
        @keyframes shadowFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <p className="text-xs text-success">
        Crossfade a pre-painted shadow layer with <code>opacity</code> — composited, so the cards keep pulsing even while the main thread is busy
      </p>
    </div>
  );
}
