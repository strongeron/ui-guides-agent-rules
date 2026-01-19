export function LayerDirectivesBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Without @layer</h4>
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-3">
            <h5 className="text-sm font-medium mb-2">Plain CSS</h5>
            <div className="font-mono text-xs bg-background rounded p-2">
              <pre className="text-error">{`.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

/* Can't override with px-6! */`}</pre>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <h5 className="text-sm font-medium">Problem</h5>
            <div className="mt-2 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-error" />
                <span>Higher specificity than utilities</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-error" />
                <span>Can't override with Tailwind classes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-error" />
                <span>May not be purged correctly</span>
              </div>
            </div>
          </div>
          <div className="font-mono text-xs bg-background rounded p-2">
            <pre>{`<button class="btn px-6">
  /* px-6 has no effect! */
</button>`}</pre>
          </div>
        </div>
      </div>
      <p className="text-xs text-error">
        Plain CSS can't be overridden by Tailwind utilities
      </p>
    </div>
  );
}
