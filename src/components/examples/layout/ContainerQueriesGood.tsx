/**
 * `@container` marks the wrapper as the thing to measure; `@xs:` on the child means
 * "when my container is at least 20rem". Same component, right answer in both slots.
 */
function Card() {
  return (
    <div className="@container">
      <article className="flex flex-col @xs:flex-row gap-3 rounded-lg border border-border bg-card p-3">
        <div className="size-12 shrink-0 rounded-md bg-muted" aria-hidden="true" />
        <div className="min-w-0">
          <h5 className="text-sm font-medium">Quarterly report</h5>
          <p className="text-xs text-muted-foreground">Updated 2 hours ago by Dana</p>
        </div>
      </article>
    </div>
  );
}

export function ContainerQueriesGood() {
  return (
    <div className="w-full space-y-4">
      <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
        <pre className="text-foreground">{`<div class="@container">                          <!-- measure me -->
  <article class="flex flex-col @xs:flex-row">  <!-- ask my container -->`}</pre>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2">In a 240px rail</p>
          <div className="w-60 rounded-lg border border-dashed border-border p-2">
            <Card />
          </div>
          <p className="text-xs text-success mt-2">Stacks. Its container is under 20rem, and it knows.</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">In the main column</p>
          <div className="rounded-lg border border-dashed border-border p-2">
            <Card />
          </div>
          <p className="text-xs text-success mt-2">Goes horizontal. Same component, no props, no context.</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Core in v4 — do not install <code className="font-mono">@tailwindcss/container-queries</code>. Name the
        container (<code className="font-mono">@container/rail</code>, <code className="font-mono">@xs/rail:</code>)
        when they nest.
      </p>
    </div>
  );
}
