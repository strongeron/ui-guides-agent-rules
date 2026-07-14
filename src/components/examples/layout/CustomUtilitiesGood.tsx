export function CustomUtilitiesGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-1">Defining it with @utility</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Top-level, unnested — that is what makes it variant-composable.
        </p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`@utility paused {
  animation-play-state: paused;
}`}</pre>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h5 className="text-sm font-medium mb-1">Every variant now works</h5>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto mt-3">
          <pre className="text-foreground">{`<div class="animate-spin hover:paused">
<div class="animate-spin motion-reduce:paused">`}</pre>
        </div>
        <ul className="mt-3 text-xs space-y-2">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-success" />
            <span>The name is in Tailwind&rsquo;s registry, so every variant is generated on demand.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-success" />
            <span>Sorted by property count alongside the built-ins, so overriding it is predictable.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-success" />
            <span>Only emitted when actually used.</span>
          </li>
        </ul>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h5 className="text-sm font-medium mb-1">A trailing -* makes it take a value</h5>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto mt-3">
          <pre className="text-foreground">{`@utility tab-* {
  tab-size: --value(integer);
}

<pre class="tab-4 md:tab-2">`}</pre>
        </div>
      </div>

      <p className="text-xs text-success">
        @utility is the only form that registers a name. Everything else is a class that looks like one.
      </p>
    </div>
  );
}
