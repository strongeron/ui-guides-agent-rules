export function RenderAsChildBad() {
  return (
    <div className="w-full max-w-md space-y-3 py-6">
      <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-relaxed text-foreground">
        {`// A "button" that is really a link — no href.
<Button onClick={() => router.push('/pricing')}>
  Pricing
</Button>

// Or the wrap-it fix: nested interactive elements.
<a href="/pricing"><Button>Pricing</Button></a>`}
      </pre>
      <div>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">Pricing</button>
      </div>
      <p className="text-xs text-destructive">
        A styled &lt;button&gt; can’t be a real link: no href means no middle-click, open-in-new-tab, or right-click. Wrapping it in an &lt;a&gt; nests two interactive elements.
      </p>
    </div>
  );
}
