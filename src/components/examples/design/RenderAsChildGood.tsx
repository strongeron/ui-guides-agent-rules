export function RenderAsChildGood() {
  return (
    <div className="w-full max-w-md space-y-3 py-6">
      <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-relaxed text-foreground">
        {`// asChild merges the button's styles/behaviour onto its child.
<Button asChild>
  <a href="/pricing">Pricing</a>
</Button>

// Renders one real <a> that looks and behaves like the button.`}
      </pre>
      <div>
        <a
          href="#example"
          className="inline-block rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Pricing
        </a>
      </div>
      <p className="text-xs text-success">
        asChild (a Slot) merges the styling and props onto the real &lt;a&gt;: correct link semantics, one element, no nesting.
      </p>
    </div>
  );
}
