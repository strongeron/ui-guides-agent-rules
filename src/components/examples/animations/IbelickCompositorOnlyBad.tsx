import { blockMainThread } from '@/lib/demo';

export function IbelickCompositorOnlyBad() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Click "Run heavy task" and watch the box.</p>
      <div className="relative h-12 rounded-lg bg-muted/50 overflow-hidden">
        <div
          className="absolute top-2 size-8 rounded-md bg-primary"
          style={{ animation: 'compLeft 1.6s ease-in-out infinite alternate' }}
        />
      </div>
      <button
        onClick={() => blockMainThread(800)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Run heavy task (0.8s)
      </button>
      <style>{`@keyframes compLeft { from { left: 8px; } to { left: 176px; } }`}</style>
      <p className="text-xs text-destructive">
        Animating <code>left</code> runs on the main thread — the box freezes while it's busy
      </p>
    </div>
  );
}
