/**
 * GOOD: <meta name="theme-color"> is declared once per color scheme, each value
 * equal to that scheme's page background. Mobile browser chrome and the PWA title
 * bar adopt the page surface, so the app extends edge-to-edge with no visible seam.
 */
export function ThemeColorMetaGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
        <pre className="text-foreground">{`<head>
  <title>Dashboard</title>
  <meta name="theme-color"
    media="(prefers-color-scheme: light)"
    content="oklch(0.98 0.0025 106)" />
  <meta name="theme-color"
    media="(prefers-color-scheme: dark)"
    content="oklch(0.147 0.004 49.25)" />
</head>`}</pre>
      </div>

      {/* Phone mockup */}
      <div className="mx-auto w-56 rounded-3xl border-4 border-border bg-border p-1">
        {/* Chrome AND page share one dark scope: one continuous surface */}
        <div className="dark overflow-hidden rounded-[1.25rem] bg-background text-foreground">
          {/* Browser chrome — now painted with the page background */}
          <div className="px-3 py-1.5">
            <div className="flex items-center justify-between text-[9px] font-medium">
              <span>9:41</span>
              <span>••••</span>
            </div>
            <div className="mt-1 rounded-full bg-muted px-2 py-0.5 text-[9px] text-muted-foreground">
              acme.app
            </div>
          </div>

          {/* The actual page */}
          <div className="px-3 py-4 space-y-2">
            <div className="text-[10px] font-semibold">Dashboard</div>
            <div className="h-2 w-4/5 rounded bg-muted" />
            <div className="h-2 w-3/5 rounded bg-muted" />
            <div className="h-6 w-24 rounded bg-primary" />
          </div>
        </div>
      </div>

      <p className="text-xs text-success">
        Chrome bar and page share one surface — the seam is gone and the app reads as
        edge-to-edge.
      </p>
    </div>
  );
}
