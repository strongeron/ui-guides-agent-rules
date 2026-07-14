export function NoApplyAbstractionGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-1">Extract a component, not a class</h4>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto mt-3">
          <pre className="text-foreground">{`// button.tsx
const button = cva(
  'inline-flex items-center rounded-md font-medium transition-colors',
  {
    variants: {
      intent: {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
      },
      size: { sm: 'px-3 py-1 text-xs', md: 'px-4 py-2 text-sm' },
    },
    defaultVariants: { intent: 'primary', size: 'md' },
  },
);`}</pre>
        </div>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto mt-2">
          <pre className="text-foreground">{`<Button intent="primary" size="sm">Save</Button>`}</pre>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h5 className="text-sm font-medium mb-3">Rendered</h5>
        <div className="flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-colors">
            Save
          </button>
          <button className="inline-flex items-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors">
            Cancel
          </button>
        </div>
        <ul className="mt-3 text-xs space-y-2">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-success" />
            <span>Variants are typed. An invalid combination is a compile error, not a mystery.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-success" />
            <span>
              The component owns behaviour too — the disabled state, the loading spinner, the{' '}
              <code className="font-mono">type=&quot;button&quot;</code> nobody remembers.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-success" />
            <span>One styling language. No CSS file to keep in sync.</span>
          </li>
        </ul>
      </div>

      <p className="text-xs text-muted-foreground">
        The ladder: repeat in a loop &rarr; extract a component &rarr; and only for markup you do not control (a{' '}
        <code className="font-mono">.prose</code> subtree, a third-party widget), reach for{' '}
        <code className="font-mono">@apply</code>.
      </p>
    </div>
  );
}
