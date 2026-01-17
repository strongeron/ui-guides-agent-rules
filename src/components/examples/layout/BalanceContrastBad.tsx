export function BalanceContrastBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg mb-4">
          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="text-sm font-bold text-foreground">Notifications</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
          <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" />
          </svg>
          <span className="text-sm font-light text-muted-foreground">Help Center</span>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Thin icon with bold text vs. heavy icon with light text. Visual weight doesn't match.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Mismatched icon/text weights - visual imbalance
      </p>
    </div>
  );
}
