export function AntiGenericBad() {
  return (
    <div className="w-full max-w-md">
      <div
        className="p-6 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
            <span className="text-2xl">✨</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            AI-Powered Solution
          </h3>
          <p className="text-sm text-white/80 mb-4">
            Supercharge your workflow with our next-generation platform.
            Unlock your potential today!
          </p>
          <button
            className="px-6 py-2.5 rounded-full text-sm font-medium"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              backdropFilter: 'blur(10px)',
            }}
          >
            Get Started Free
          </button>
        </div>
      </div>
      <p className="text-xs text-destructive mt-4">
        Generic Inter font, purple gradient, centered layout, excessive rounding, sparkle emoji
      </p>
    </div>
  );
}
