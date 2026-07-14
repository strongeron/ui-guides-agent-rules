/**
 * GOOD: `color-scheme: dark` is declared alongside the dark tokens, so the browser
 * renders its own chrome — scrollbars, checkboxes, range tracks, date pickers,
 * spinners — in dark mode too. One CSS property, zero custom widget styling.
 */
export function ColorSchemeGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
        <pre className="text-foreground">{`html.dark {
  /* every token flipped to dark… */
  color-scheme: dark; /* ← tell the UA */
}

/* Or let the UA follow the OS: */
html { color-scheme: light dark; }`}</pre>
      </div>

      {/* Same dark-themed page region, now with a matching color-scheme. */}
      <div
        className="dark bg-background text-foreground border border-border rounded-lg p-4 space-y-3"
        style={{ colorScheme: 'dark' }}
      >
        <p className="text-xs font-medium text-muted-foreground">
          Dark page, dark native widgets
        </p>

        <div className="h-24 overflow-y-scroll rounded-md border border-border p-2 text-xs leading-5">
          <p>Scroll me. The scrollbar is dark, because the UA knows the page is.</p>
          <p>It blends into the panel instead of glaring.</p>
          <p>Same for every control below.</p>
          <p>All of them got the memo.</p>
          <p>One declaration did it.</p>
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

      <p className="text-xs text-success">
        Scrollbar, checkbox, slider and date picker all follow the theme — no custom
        widget CSS, just `color-scheme`.
      </p>
    </div>
  );
}
