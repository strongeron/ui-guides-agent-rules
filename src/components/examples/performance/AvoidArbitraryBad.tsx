export function AvoidArbitraryBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Arbitrary Value Usage</h4>
        <div className="space-y-3">
          <div className="p-[17px] bg-muted rounded">
            <code className="text-xs text-error">p-[17px]</code>
            <span className="text-sm text-muted-foreground ml-2">- magic number</span>
          </div>
          <div className="text-[#1a1a1a] dark:text-[#e5e5e5]">
            <code className="text-xs text-error bg-muted px-1 rounded">text-[#1a1a1a]</code>
            <span className="text-sm text-muted-foreground ml-2">- hardcoded hex</span>
          </div>
          <div className="w-[327px] h-8 bg-primary/20 rounded flex items-center justify-center">
            <code className="text-xs text-error">w-[327px]</code>
            <span className="text-sm text-muted-foreground ml-2">- arbitrary width</span>
          </div>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        <strong className="text-foreground">Problems:</strong>
        <ul className="mt-1 space-y-1">
          <li>Bypasses design system</li>
          <li>Creates one-off CSS rules</li>
          <li>Harder to maintain</li>
        </ul>
      </div>
      <p className="text-xs text-error">
        Arbitrary values create inconsistency and larger CSS bundles
      </p>
    </div>
  );
}
