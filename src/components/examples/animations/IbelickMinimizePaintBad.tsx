import { blockMainThread } from '@/lib/demo';

const cards = Array.from({ length: 8 }, (_, i) => i);

export function IbelickMinimizePaintBad() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Click "Run heavy task" and watch the cards.</p>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((i) => (
          <div
            key={i}
            className="h-12 rounded-md bg-primary"
            style={{ animation: 'paintPulse 1.2s ease-in-out infinite alternate' }}
          />
        ))}
      </div>
      <button
        onClick={() => blockMainThread(800)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Run heavy task (0.8s)
      </button>
      <style>{`
        @keyframes paintPulse {
          from { box-shadow: 0 0 0 0 rgba(0,0,0,0); }
          to { box-shadow: 0 8px 24px 4px rgba(0,0,0,0.5); }
        }
      `}</style>
      <p className="text-xs text-destructive">
        Animating <code>box-shadow</code> repaints every frame on the main thread — the cards freeze while it's busy
      </p>
    </div>
  );
}
