export function ImpeccableTinyTextGood() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="mb-2 text-base font-semibold text-foreground">Terms of service</h4>

        {/* Prose at 1rem — scales with the user's browser font-size setting */}
        <p className="text-[1rem] leading-[1.6] text-muted-foreground">
          By creating an account you agree that we may store your project metadata for as long as
          the account exists, that build logs are retained for 30 days, and that usage above the
          included quota is billed at the end of each calendar month. You can export or delete your
          data at any time from the account settings page.
        </p>

        <div className="mt-3 flex items-center gap-2">
          {/* Still small — a UI chrome label is allowed to be, and the detector excludes it */}
          <button className="rounded-md bg-primary px-3 py-1.5 text-[0.8125rem] text-primary-foreground">
            Accept
          </button>
          <span className="text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
            Updated Mar 2026
          </span>
        </div>
      </div>

      <p className="text-xs text-success">
        The prose moves to 1rem (16px, the ideal; 14px is the floor) and stays in rem so a reader
        who raises their browser font size gets bigger text. The timestamp stays at 0.6875rem on
        purpose — the rule is about body content, not chrome, so short uppercase labels and button
        text keep their small size.
      </p>
    </div>
  );
}
