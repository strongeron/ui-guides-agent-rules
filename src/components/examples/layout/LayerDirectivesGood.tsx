export function LayerDirectivesGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-1">
          <code className="font-mono">@layer base</code> — still correct
        </h4>
        <p className="text-xs text-muted-foreground mb-3">
          Element defaults and resets. This is the one v4 use of <code className="font-mono">@layer</code>.
        </p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`@layer base {
  h1 { font-size: var(--text-2xl); }
  a  { text-underline-offset: 2px; }
}`}</pre>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-1">
          <code className="font-mono">@utility</code> — for anything variant-addressable
        </h4>
        <p className="text-xs text-muted-foreground mb-3">
          Registers the name with the compiler, which is what buys you variants.
        </p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`@utility scrollbar-hide {
  scrollbar-width: none;
}`}</pre>
        </div>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto mt-2">
          <pre className="text-foreground">{`<div class="hover:scrollbar-hide md:scrollbar-hide">
<!-- both variants generated -->`}</pre>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h5 className="text-sm font-medium mb-2">And the third block?</h5>
        <p className="text-xs text-muted-foreground">
          <code className="font-mono">@layer components</code> for a <code className="font-mono">.card</code> class has
          no v4 replacement because it needs none — extract a React component instead. See{' '}
          <span className="font-medium">&ldquo;@apply Is Not How You Share Styles&rdquo;</span>.
        </p>
      </div>

      <p className="text-xs text-success">
        @layer base for elements. @utility for utilities. Components for components.
      </p>
    </div>
  );
}
