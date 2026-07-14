export function TranslateNoGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <p className="text-xs text-muted-foreground">
          Page after Chrome auto-translate (English → Spanish)
        </p>
        <h4 className="font-medium text-foreground">
          Instale el <span translate="no">Vercel</span> CLI
        </h4>
        <pre
          translate="no"
          className="p-2 bg-muted rounded text-xs text-foreground overflow-x-auto"
        >
          <code>npm install --global vercel</code>
        </pre>
        <p className="text-sm text-muted-foreground">
          Establezca{' '}
          <code translate="no" className="px-1 bg-muted rounded">
            API_KEY
          </code>{' '}
          en su entorno.
        </p>
      </div>
      <p className="text-xs text-success">
        Prose gets translated; the brand, the command and the identifier are
        marked translate="no" and survive intact
      </p>
    </div>
  );
}
