export function IbelickNoPurpleBad() {
  return (
    <div className="space-y-4">
      <div className="p-6 rounded-lg border">
        <div
          className="text-2xl font-bold bg-clip-text text-transparent bg-[image:var(--ex-no-purple-text)]"
        >
          AI-Powered Analytics
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Transform your data with machine learning
        </p>
        <button
          className="mt-4 px-4 py-2 rounded-lg text-white text-sm bg-[image:var(--ex-no-purple-button)]"
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
