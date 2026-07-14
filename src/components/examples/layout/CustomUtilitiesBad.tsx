export function CustomUtilitiesBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-1">Defining it in @layer utilities</h4>
        <p className="text-xs text-muted-foreground mb-3">
          The v3 shape. In v4 this registers nothing with the compiler.
        </p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-error">{`@layer utilities {
  .paused {
    animation-play-state: paused;
  }
}`}</pre>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h5 className="text-sm font-medium mb-1">Then using it like a utility</h5>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto mt-3">
          <pre className="text-error">{`<div class="animate-spin hover:paused">
<!-- hover:paused was never generated -->

<div class="motion-reduce:paused">
<!-- neither was this -->`}</pre>
        </div>
        <ul className="mt-3 text-xs space-y-2">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>
              Bare <code className="font-mono">paused</code> works, so the bug hides: it looks like the utility exists.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>The variants are silently dropped. The spinner never stops on hover.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>You debug the animation for an hour before suspecting the class.</span>
          </li>
        </ul>
      </div>

      <p className="text-xs text-error">
        In v4, @layer utilities is not an alternative to @utility. It is the wrong answer.
      </p>
    </div>
  );
}
