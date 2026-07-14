export function CustomBreakpointsBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-1">Step 1 — reach for the v3 config</h4>
        <p className="text-xs text-muted-foreground mb-3">
          <code className="font-mono">theme.extend.screens</code> is gone. Nothing loads this.
        </p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-error">{`// tailwind.config.js — not read by v4
theme: { extend: { screens: { '3xl': '1920px' } } }`}</pre>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-1">Step 2 — give up, inline the number</h4>
        <p className="text-xs text-muted-foreground mb-3">
          <code className="font-mono">3xl:</code> never existed, so the width gets pasted at every call site.
        </p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-error">{`<div class="min-[1920px]:flex">
<div class="min-[1921px]:grid">     <!-- off by one -->
<div class="min-[1919px]:hidden">   <!-- off by one -->`}</pre>
        </div>
        <p className="text-xs text-error mt-3">
          A magic number with no name. The next person guesses 1919 and the layout breaks in a 1px band.
        </p>
      </div>
    </div>
  );
}
