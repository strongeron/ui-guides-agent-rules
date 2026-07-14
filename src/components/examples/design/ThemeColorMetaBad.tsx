/**
 * BAD: No <meta name="theme-color">. The page ships a dark surface, but mobile
 * browser chrome (Safari/Chrome address bar, the PWA title bar, the Android task
 * switcher card) keeps its default light fill — so the app ends up wearing a
 * bright collar it never asked for.
 */
export function ThemeColorMetaBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
        <pre className="text-error">{`<head>
  <title>Dashboard</title>
  <!-- no theme-color: browser chrome -->
  <!-- keeps its own default fill     -->
</head>`}</pre>
      </div>

      {/* Phone mockup */}
      <div className="mx-auto w-56 rounded-3xl border-4 border-border bg-border p-1">
        <div className="overflow-hidden rounded-[1.25rem]">
          {/* Browser chrome — NOT in the dark scope: default light fill */}
          <div className="bg-background text-foreground px-3 py-1.5">
            <div className="flex items-center justify-between text-[9px] font-medium">
              <span>9:41</span>
              <span>••••</span>
            </div>
            <div className="mt-1 rounded-full bg-muted px-2 py-0.5 text-[9px] text-muted-foreground">
              acme.app
            </div>
          </div>

          {/* The actual page: dark */}
          <div className="dark bg-background text-foreground px-3 py-4 space-y-2">
            <div className="text-[10px] font-semibold">Dashboard</div>
            <div className="h-2 w-4/5 rounded bg-muted" />
            <div className="h-2 w-3/5 rounded bg-muted" />
            <div className="h-6 w-24 rounded bg-primary" />
          </div>
        </div>
      </div>

      <p className="text-xs text-error">
        A hard seam: the browser chrome bar stays light while the page below it is
        dark. On iOS and Android this is the first thing the user sees.
      </p>
    </div>
  );
}
