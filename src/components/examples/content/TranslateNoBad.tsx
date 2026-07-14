export function TranslateNoBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <p className="text-xs text-muted-foreground">
          Page after Chrome auto-translate (English → Spanish)
        </p>
        {/* Nothing is marked translate="no", so the brand, the command and the
            env var name all get "translated" into gibberish. */}
        <h4 className="font-medium text-foreground">Instale el Vértice CLI</h4>
        <pre className="p-2 bg-muted rounded text-xs text-foreground overflow-x-auto">
          <code>npm instalar --global vértice</code>
        </pre>
        <p className="text-sm text-muted-foreground">
          Establezca <code className="px-1 bg-muted rounded">CLAVE_API</code>{' '}
          en su entorno.
        </p>
      </div>
      <p className="text-xs text-error">
        The command no longer runs and the env var no longer exists — the
        translator rewrote the one part of the page that must never change
      </p>
    </div>
  );
}
