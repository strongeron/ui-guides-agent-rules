export function ExplicitVariantsOverBooleansBad() {
  return (
    <div className="w-full max-w-md space-y-3 py-6">
      <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-relaxed text-foreground">
        {`<Button isPrimary isLarge />
<Button isGhost isSmall />
<Button isPrimary isGhost />  // ??? illegal combo`}
      </pre>
      <div className="flex items-center gap-2">
        <button className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">Primary</button>
        <button className="rounded-lg px-3 py-1 text-xs text-muted-foreground">Ghost</button>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground ring-2 ring-inset ring-destructive">??</button>
      </div>
      <p className="text-xs text-destructive">
        Boolean props multiply into illegal combinations (isPrimary + isGhost) and every new style adds another boolean to reconcile.
      </p>
    </div>
  );
}
