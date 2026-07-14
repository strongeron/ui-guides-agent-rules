export function LanguageDetectionGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <p className="text-xs text-muted-foreground font-mono">
          Accept-Language: en-US, en;q=0.9
          <br />
          IP → Frankfurt, DE → <span className="text-success">ignored</span>
        </p>
        <div lang="en" className="pt-1 border-t border-border space-y-1">
          <h4 className="font-medium text-foreground">Deployment Failed</h4>
          <p className="text-sm text-muted-foreground">
            Your changes are saved. Check the build logs.
          </p>
        </div>
        <label htmlFor="lang-good" className="block text-xs text-muted-foreground">
          Language
          <select
            id="lang-good"
            defaultValue="en"
            className="mt-1 w-full px-2 py-1.5 text-sm bg-background text-foreground border border-border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="en">English</option>
            <option value="de">Deutsch</option>
          </select>
        </label>
      </div>
      <p className="text-xs text-success">
        The user's stated language preference wins, with an explicit override —
        no guessing from IP
      </p>
    </div>
  );
}
