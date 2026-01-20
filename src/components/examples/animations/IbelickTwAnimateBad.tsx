export function IbelickTwAnimateBad() {
  return (
    <div className="space-y-4">
      {/* Custom keyframes for a simple fade-in - reinventing the wheel */}
      <style>{`
        @keyframes customFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .custom-fade-in {
          animation: customFadeIn 0.3s ease-out forwards;
        }
      `}</style>
      <div className="custom-fade-in p-4 bg-muted rounded-lg">
        Animated with custom keyframes
      </div>
      <div
        className="p-4 bg-muted rounded-lg"
        style={{
          animation: 'customFadeIn 0.3s ease-out forwards',
          animationDelay: '0.1s',
          opacity: 0,
        }}
      >
        Another custom animation
      </div>
      <p className="text-xs text-destructive mt-4">
        Custom keyframes for standard animations add maintenance burden
      </p>
    </div>
  );
}
