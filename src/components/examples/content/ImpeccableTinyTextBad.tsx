export function ImpeccableTinyTextBad() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="mb-2 text-base font-semibold text-foreground">Terms of service</h4>

        {/* The bug: 10px PROSE. 60+ characters of running text nobody can read. */}
        <p className="text-[10px] leading-[1.5] text-muted-foreground">
          By creating an account you agree that we may store your project metadata for as long as
          the account exists, that build logs are retained for 30 days, and that usage above the
          included quota is billed at the end of each calendar month. You can export or delete your
          data at any time from the account settings page.
        </p>

        <div className="mt-3 flex items-center gap-2">
          {/* Also 10px — but this is a UI chrome label, not prose. Same size, different rule. */}
          <button className="rounded-md bg-primary px-3 py-1.5 text-[10px] text-primary-foreground">
            Accept
          </button>
          <span className="text-[10px] text-muted-foreground">Updated Mar 2026</span>
        </div>
      </div>

      <p className="text-xs text-error">
        Both the paragraph and the button label are 10px, but only the paragraph is the bug. The
        detector fires on font-size &lt; 12px on an element carrying more than 20 characters of
        direct prose — it skips buttons, links, labels, nav, footers, badges, code, and captions. A
        wall of 10px running text is unreadable on a high-DPI screen; a 10px button label is not
        prose.
      </p>
    </div>
  );
}
