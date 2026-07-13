import { blockMainThread } from '@/lib/demo';

export function ImplementationPreferenceGood() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Click "Run heavy task" and watch the box.</p>
      <div className="relative h-12 rounded-lg bg-muted/50 overflow-hidden">
        <div
          className="absolute top-2 left-0 size-8 rounded-md bg-primary"
          style={{ animation: 'implSlide 0.8s ease-in-out infinite alternate' }}
        />
      </div>
      <button
        onClick={() => blockMainThread(800)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Run heavy task (0.8s)
      </button>
      <style>{`@keyframes implSlide { from { transform: translateX(0); } to { transform: translateX(160px); } }`}</style>
      <p className="text-xs text-success">
        The same motion as a CSS animation runs on the compositor — it keeps gliding even while the main thread is busy
      </p>
    </div>
  );
}
