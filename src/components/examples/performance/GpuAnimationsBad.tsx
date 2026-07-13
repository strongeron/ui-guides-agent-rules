import { blockMainThread } from '@/lib/demo';

export function GpuAnimationsBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <p className="text-sm text-muted-foreground">Click "Run heavy task" and watch the box.</p>
      <div className="relative h-12 rounded-lg bg-muted/50 overflow-hidden">
        <div
          className="absolute top-2 size-8 rounded-md bg-primary"
          style={{ animation: 'gpuBadMargin 1.6s ease-in-out infinite alternate' }}
        />
      </div>
      <button
        onClick={() => blockMainThread(800)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Run heavy task (0.8s)
      </button>
      <style>{`@keyframes gpuBadMargin { from { margin-left: 8px; } to { margin-left: 176px; } }`}</style>
      <p className="text-xs text-destructive">
        Animating <code>margin</code> (a layout property) runs on the main thread, so the box freezes the moment the
        thread is busy
      </p>
    </div>
  );
}
