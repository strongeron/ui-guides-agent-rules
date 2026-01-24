export function BoldDirectionBad() {
  return (
    <div className="w-full max-w-md">
      <div
        className="p-6 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-lg">✨</span>
          </div>
          <h3 className="text-lg font-semibold text-white">
            AI-Powered Platform
          </h3>
        </div>
        <p className="text-sm text-white/80 mb-4">
          Experience the future of productivity with our cutting-edge solution.
          Unlock your potential today!
        </p>
        <button className="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-full text-sm font-medium">
          Get Started Free →
        </button>
      </div>
      <p className="text-xs text-destructive mt-4">
        Generic AI aesthetics: purple gradients, sparkles, buzzwords, rounded everything
      </p>
    </div>
  );
}
