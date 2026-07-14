export function InlineHelpFirstGood() {
  return (
    <div className="w-full max-w-sm">
      <form className="space-y-4">
        <div>
          <label htmlFor="good-inline-api" className="block text-sm font-medium text-foreground mb-1">
            API Key
          </label>
          <input
            id="good-inline-api"
            type="text"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Your API key is used to authenticate requests. Find it in your account settings.
          </p>
        </div>
      </form>
      <p className="text-xs text-success mt-4">
        Help text always visible and accessible
      </p>
    </div>
  );
}
