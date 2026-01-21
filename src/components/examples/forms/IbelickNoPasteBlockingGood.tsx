export function IbelickNoPasteBlockingGood() {
  return (
    <div className="space-y-4">
      <form className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full mt-1 px-3 py-2 border rounded-lg"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full mt-1 px-3 py-2 border rounded-lg"
            placeholder="••••••••"
            autoComplete="new-password"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Paste from password manager supported
          </p>
        </div>
      </form>
      <p className="text-xs text-success">
        Paste allowed everywhere - works with password managers and accessibility tools
      </p>
    </div>
  );
}
