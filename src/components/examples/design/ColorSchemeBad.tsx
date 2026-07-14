/**
 * BAD: The page is painted dark by CSS, but `color-scheme` is never declared on
 * <html>. The browser therefore keeps its default light rendering intent, so every
 * piece of *native* UA chrome — scrollbar track/thumb, checkbox, range track, date
 * picker — is drawn light on top of the dark surface.
 *
 * The `colorScheme: 'light'` below is what an undeclared <html> effectively gives you.
 */
export function ColorSchemeBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
        <pre className="text-error">{`html.dark {
  /* every token flipped to dark… */
  /* …but nothing here tells the   */
  /* browser how to paint its own  */
  /* scrollbars and form controls. */
}`}</pre>
      </div>

      {/* A dark-themed page region. No matching color-scheme. */}
      <div
        className="dark bg-background text-foreground border border-border rounded-lg p-4 space-y-3"
        style={{ colorScheme: 'light' }}
      >
        <p className="text-xs font-medium text-muted-foreground">
          Dark page, light native widgets
        </p>

        <div className="h-24 overflow-y-scroll rounded-md border border-border p-2 text-xs leading-5">
          <p>Scroll me. The scrollbar next to this text is still the light-mode one.</p>
          <p>It sits on a dark panel and glares.</p>
          <p>Same for every control below.</p>
          <p>None of them got the memo.</p>
          <p>Because the browser was never told.</p>
        </div>

        <label className="flex items-center gap-2 text-xs">
          <input type="checkbox" defaultChecked />
          Native checkbox
        </label>

        <label className="block space-y-1 text-xs">
          <span>Native range</span>
          <input type="range" defaultValue={40} className="w-full" />
        </label>

        <label className="block space-y-1 text-xs">
          <span>Native date input</span>
          <input type="date" defaultValue="2026-07-14" className="w-full rounded-md p-1" />
        </label>
      </div>

      <p className="text-xs text-error">
        Scrollbar, checkbox, slider and date picker render in light mode on a dark
        page — the browser was never told the page is dark.
      </p>
    </div>
  );
}
