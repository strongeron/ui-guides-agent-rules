export function NoApplyAbstractionBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-1">&ldquo;The markup was too long, so I cleaned it up&rdquo;</h4>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto mt-3">
          <pre className="text-error">{`/* buttons.css */
.btn {
  @apply inline-flex items-center rounded-md px-4 py-2
         text-sm font-medium transition-colors;
}
.btn-primary   { @apply bg-primary text-primary-foreground; }
.btn-secondary { @apply bg-secondary text-secondary-foreground; }
.btn-sm        { @apply px-3 py-1 text-xs; }
.btn-icon      { @apply p-2; }`}</pre>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h5 className="text-sm font-medium mb-1">What you actually bought</h5>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto mt-3">
          <pre className="text-error">{`<button class="btn btn-primary btn-sm">Save</button>`}</pre>
        </div>
        <ul className="mt-3 text-xs space-y-2">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>
              A name that means nothing to the browser, and you cannot read the button&rsquo;s appearance from the
              button.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>
              Editing <code className="font-mono">.btn</code> silently repaints every button in the product — the exact
              cascade problem utilities exist to remove.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>
              Four classes in and you are hand-rolling a variant system. Which wins,{' '}
              <code className="font-mono">btn-sm</code> or <code className="font-mono">btn-icon</code>? Nobody knows.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>The markup got shorter. The system got a second styling language.</span>
          </li>
        </ul>
      </div>

      <p className="text-xs text-error">
        @apply moved the utilities into a CSS file and called it an abstraction. It abstracted nothing.
      </p>
    </div>
  );
}
