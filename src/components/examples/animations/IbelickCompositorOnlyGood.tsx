export function IbelickCompositorOnlyGood() {
  return (
    <div className="space-y-4">
      <div className="relative h-20 bg-muted rounded-lg overflow-hidden">
        <div
          className="absolute left-0 top-5 bg-primary text-primary-foreground px-4 py-2 rounded"
          style={{
            animation: 'slideTransform 2s infinite',
          }}
        >
          Moving Box
        </div>
      </div>
      <style>{`
        @keyframes slideTransform {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(calc(100% + 40px)) translateY(20px); }
          100% { transform: translateX(0) translateY(0); }
        }
      `}</style>
      <p className="text-xs text-success">
        Using transform runs on compositor thread - smooth 60fps
      </p>
    </div>
  );
}
