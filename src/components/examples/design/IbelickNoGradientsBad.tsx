export function IbelickNoGradientsBad() {
  return (
    <div className="space-y-4">
      <div
        className="p-6 rounded-lg text-white bg-[image:var(--ex-no-gradients-card)]"
      >
        <h3 className="font-semibold text-lg">Premium Plan</h3>
        <p className="text-sm opacity-90 mt-1">Unlock all features</p>
        <button
          className="mt-4 px-4 py-2 rounded-lg text-sm font-medium bg-[image:var(--ex-no-gradients-button)]"
        >
          Upgrade Now
        </button>
      </div>
      <p className="text-xs text-destructive">
        Gradients everywhere - looks generic and reduces text contrast
      </p>
    </div>
  );
}
