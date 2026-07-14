export function DarkModeClassGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-1">Override the variant in CSS</h4>
        <p className="text-xs text-muted-foreground mb-3">
          This is <code className="font-mono">src/index.css</code> line 7 of this very app.
        </p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`@import "tailwindcss";

@custom-variant dark (&:is(.dark *));`}</pre>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          The selector must match the <code className="font-mono">.dark</code> element and its descendants — otherwise{' '}
          <code className="font-mono">dark:</code> on <code className="font-mono">&lt;html&gt;</code> never fires.
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h5 className="text-sm font-medium">Now a class drives the theme</h5>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`document.documentElement.classList
  .toggle('dark', theme === 'dark');`}</pre>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 bg-background border border-border rounded text-sm">Light</button>
          <button className="flex-1 px-3 py-2 bg-foreground text-background rounded text-sm">Dark</button>
          <button className="flex-1 px-3 py-2 bg-muted text-muted-foreground rounded text-sm">System</button>
        </div>
        <p className="text-xs text-muted-foreground">
          Seed it from <code className="font-mono">prefers-color-scheme</code>, then let the user override and persist
          the choice.
        </p>
      </div>

      <p className="text-xs text-success">
        The theme toggle at the top of this page works because of exactly this line.
      </p>
    </div>
  );
}
