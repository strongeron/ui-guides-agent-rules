export function LanguageDetectionBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <p className="text-xs text-muted-foreground font-mono">
          navigator.languages = ["en-US", "en"]
          <br />
          IP → Frankfurt, DE → serve <span className="text-error">de-DE</span>
        </p>
        <div lang="de" className="pt-1 border-t border-border space-y-1">
          <h4 className="font-medium text-foreground">Bereitstellung fehlgeschlagen</h4>
          <p className="text-sm text-muted-foreground">
            Ihre Änderungen wurden gespeichert. Überprüfen Sie die
            Erstellungsprotokolle.
          </p>
        </div>
      </div>
      <p className="text-xs text-error">
        An English speaker on a VPN, a business trip, or a proxy gets a UI they
        can't read — location is not language
      </p>
    </div>
  );
}
