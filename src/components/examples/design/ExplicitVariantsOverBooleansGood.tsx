export function ExplicitVariantsOverBooleansGood() {
  return (
    <div className="w-full max-w-md space-y-3 py-6">
      <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-relaxed text-foreground">
        {`<Button variant="primary" size="lg" />
<Button variant="ghost" size="sm" />
// one variant + one size — illegal combos are unrepresentable`}
      </pre>
      <div className="flex items-center gap-2">
        <button className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">Primary</button>
        <button className="rounded-lg px-3 py-1 text-xs text-muted-foreground hover:bg-muted">Ghost</button>
      </div>
      <p className="text-xs text-success">
        One enumerated variant prop makes illegal states unrepresentable and maps cleanly onto CVA — new looks are new variant values, not new booleans.
      </p>
    </div>
  );
}
