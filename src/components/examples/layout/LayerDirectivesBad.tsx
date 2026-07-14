export function LayerDirectivesBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-1">The v3 three-layer habit</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Reads the same in v4. Two of the three no longer mean what you think.
        </p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-error">{`@layer components {
  .card { padding: 1rem; border-radius: 0.5rem; }
}

@layer utilities {
  .scrollbar-hide { scrollbar-width: none; }
}`}</pre>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h5 className="text-sm font-medium mb-1">At the call site</h5>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto mt-3">
          <pre className="text-error">{`<div class="hover:scrollbar-hide md:scrollbar-hide">
<!-- neither variant exists. both are dropped. -->`}</pre>
        </div>
        <ul className="mt-3 text-xs space-y-2">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>
              In v4 <code className="font-mono">@layer</code> is a native CSS cascade layer. Tailwind does not read
              these blocks.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>
              <code className="font-mono">.scrollbar-hide</code> is a plain class, not a registered utility — so the
              compiler cannot generate a variant of a name it has never heard of.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>It has no place in the property-count sort order, so overriding it is a coin toss.</span>
          </li>
        </ul>
      </div>

      <p className="text-xs text-error">
        It looks like a utility and fails the moment anyone uses it like one.
      </p>
    </div>
  );
}
