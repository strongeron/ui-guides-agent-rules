export function CustomBreakpointsBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Arbitrary Breakpoints</h4>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto mb-4">
          <pre className="text-error">{`<!-- Scattered throughout codebase -->
<div class="min-[960px]:flex">
<div class="min-[961px]:grid">
<div class="min-[959px]:hidden">
<!-- Inconsistent values! -->`}</pre>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <code className="text-xs bg-muted px-2 py-1 rounded text-error">min-[960px]:</code>
            <span className="text-muted-foreground">magic number</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-muted px-2 py-1 rounded text-error">min-[1200px]:</code>
            <span className="text-muted-foreground">not reusable</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-error">
        Arbitrary breakpoints create inconsistency and are hard to maintain
      </p>
    </div>
  );
}
