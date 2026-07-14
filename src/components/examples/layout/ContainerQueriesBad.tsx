/**
 * The card asks the viewport how much room it has. The viewport is wide, so the
 * card goes horizontal — even the copy sitting in a 240px rail.
 */
function Card() {
  return (
    <article className="flex flex-col sm:flex-row gap-3 rounded-lg border border-border bg-card p-3">
      <div className="size-12 shrink-0 rounded-md bg-muted" aria-hidden="true" />
      <div className="min-w-0">
        <h5 className="text-sm font-medium">Quarterly report</h5>
        <p className="text-xs text-muted-foreground">Updated 2 hours ago by Dana</p>
      </div>
    </article>
  );
}

export function ContainerQueriesBad() {
  return (
    <div className="w-full space-y-4">
      <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
        <pre className="text-error">{`<article class="flex flex-col sm:flex-row">  <!-- asks the window -->`}</pre>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2">In a 240px rail</p>
          <div className="w-60 rounded-lg border border-dashed border-border p-2">
            <Card />
          </div>
          <p className="text-xs text-error mt-2">
            Horizontal and crushed. The rail is 240px wide, but <code className="font-mono">sm:</code> only asked
            whether the <em>window</em> was 640px.
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">In the main column</p>
          <div className="rounded-lg border border-dashed border-border p-2">
            <Card />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Fine here — which is why nobody catches it.</p>
        </div>
      </div>

      <p className="text-xs text-error">
        The component is not broken. The question it is asking is: it queries the window it does not live in.
      </p>
    </div>
  );
}
