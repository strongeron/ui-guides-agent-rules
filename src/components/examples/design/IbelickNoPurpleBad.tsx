export function IbelickNoPurpleBad() {
  return (
    <div className="space-y-4">
      <div className="p-6 rounded-lg border">
        <div
          className="text-2xl font-bold bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(90deg, #a855f7, #ec4899, #f97316)',
          }}
        >
          AI-Powered Analytics
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Transform your data with machine learning
        </p>
        <button
          className="mt-4 px-4 py-2 rounded-lg text-white text-sm"
          style={{
            background: 'linear-gradient(90deg, #8b5cf6, #d946ef)',
          }}
        >
          Get Started Free
        </button>
      </div>
      <p className="text-xs text-destructive">
        Purple/pink/orange gradient - screams "AI generated" generic SaaS
      </p>
    </div>
  );
}
