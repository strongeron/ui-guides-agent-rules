export function IbelickMinimizePaintBad() {
  return (
    <div className="space-y-4">
      <button
        className="px-6 py-3 rounded-lg font-medium transition-all duration-300"
        style={{
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
          boxShadow: '0 4px 20px rgba(59, 130, 246, 0.5)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(90deg, #8b5cf6, #ec4899)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(139, 92, 246, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(90deg, #3b82f6, #8b5cf6)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.5)';
        }}
      >
        <span className="text-white">Hover Me</span>
      </button>
      <p className="text-xs text-destructive">
        Animating gradients and box-shadows triggers expensive paint operations
      </p>
    </div>
  );
}
