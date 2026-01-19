export function CustomUtilitiesBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Inline Styles Instead</h4>
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-3">
            <h5 className="text-sm font-medium mb-2">Inline Approach</h5>
            <div className="font-mono text-xs bg-background rounded p-2">
              <pre className="text-error">{`<h1 style={{ textWrap: 'balance' }}>
  Title
</h1>

<div style={{ scrollbarWidth: 'none' }}>
  Content
</div>`}</pre>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <h5 className="text-sm font-medium mb-2">Problems</h5>
            <ul className="text-xs space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-error" />
                <span>Can't use with variants</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-error" />
                <span>Not reusable</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-error" />
                <span>Breaks Tailwind patterns</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-error" />
                <span>Higher specificity</span>
              </li>
            </ul>
          </div>
          <div className="font-mono text-xs bg-background rounded p-2">
            <code className="text-error">{"md:style={{ ... }} // Doesn't work!"}</code>
          </div>
        </div>
      </div>
      <p className="text-xs text-error">
        Inline styles don't support variants or Tailwind patterns
      </p>
    </div>
  );
}
