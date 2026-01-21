export function IbelickNoPasteBlockingBad() {
  return (
    <div className="space-y-4">
      <form className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full mt-1 px-3 py-2 border rounded-lg"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Confirm Email</label>
          <input
            type="email"
            className="w-full mt-1 px-3 py-2 border rounded-lg"
            placeholder="you@example.com"
            onPaste={(e) => {
              e.preventDefault();
              // Blocking paste!
            }}
          />
          <p className="text-xs text-muted-foreground mt-1">Please type your email again</p>
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full mt-1 px-3 py-2 border rounded-lg"
            placeholder="••••••••"
            onPaste={(e) => {
              e.preventDefault();
              // Blocking paste!
            }}
          />
        </div>
      </form>
      <p className="text-xs text-destructive">
        Blocking paste breaks password managers and frustrates users
      </p>
    </div>
  );
}
