/**
 * Bad: the form fields are painted from the LAYOUT tokens. The input background is the
 * card background, and the input border is the same `--border` that draws dividers —
 * a token deliberately tuned to be quiet. So the field is exactly as bright as the panel
 * it sits in, its only boundary is a whisper-hairline, and the input becomes a rumour.
 */
export function InterfaceControlTokensBad() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <p className="text-xs text-muted-foreground">Controls painted from surface tokens</p>

      <form className="space-y-3 rounded-lg border border-border bg-card p-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1">
          <label htmlFor="bad-project" className="block text-xs font-medium text-foreground">
            Project name
          </label>
          {/* bg-card === the panel behind it; border-border === the divider token */}
          <input
            id="bad-project"
            type="text"
            defaultValue="atlas-web"
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" defaultChecked className="size-4 accent-muted" />
          Deploy on push
        </label>

        {/* The divider uses the SAME token as the input border, which is the whole problem */}
        <hr className="border-border" />
        <p className="text-xs text-muted-foreground">Changes apply to the next build.</p>
      </form>

      <div className="rounded bg-muted p-2 font-mono text-xs">
        <code className="text-error">--input-bg = --card &nbsp;·&nbsp; --input-border = --border</code>
      </div>

      <p className="text-xs text-error">
        A card should RECEIVE the eye and recede; an input should INVITE input and announce itself.
        Bind them to one token and the field cannot do its job. And you cannot fix it by darkening
        <code className="mx-1 font-mono">--border</code>: that same token draws the divider below, so
        every quiet line on the page would shout with it.
      </p>
    </div>
  );
}
