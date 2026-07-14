// One object. Four names for it, all on the same screen.
const SYNONYMS = ['project', 'app', 'site', 'deployment', 'Project', 'App', 'Site', 'Deployment'];
const SYNONYM_PATTERN = new RegExp(`\\b(${SYNONYMS.join('|')})\\b`, 'g');

const LINES = [
  { label: 'Heading', text: 'Project settings' },
  { label: 'Subhead', text: 'Configure how your app builds and runs.' },
  { label: 'Field', text: 'Site name' },
  { label: 'Help text', text: 'This name appears in the URL of every deployment.' },
  { label: 'Button', text: 'Delete this app' },
  { label: 'Toast', text: 'Your site was removed.' },
];

const UNIQUE_TERMS = new Set(
  LINES.flatMap((line) => line.text.match(SYNONYM_PATTERN) ?? []).map((term) => term.toLowerCase()),
);

function Highlighted({ text }: { text: string }) {
  const parts = text.split(SYNONYM_PATTERN);
  return (
    <span className="text-sm text-foreground">
      {parts.map((part, i) =>
        // split() with a capture group puts the matches at odd indices
        i % 2 === 1 ? (
          <mark key={i} className="rounded bg-error/15 px-1 font-semibold text-error">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}

export function ConsistentNounsBad() {
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="divide-y divide-border rounded-lg border border-border bg-card">
        {LINES.map((line) => (
          <div key={line.label} className="flex items-baseline gap-3 p-3">
            <span className="w-20 shrink-0 text-xs uppercase tracking-wide text-muted-foreground">
              {line.label}
            </span>
            <Highlighted text={line.text} />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-error">
          unique terms: {UNIQUE_TERMS.size}
        </span>
        <span className="text-muted-foreground">
          {[...UNIQUE_TERMS].join(' · ')} — all the same object
        </span>
      </div>

      <p className="text-xs text-error">
        Six strings, four nouns, one thing. The reader has to guess whether deleting the “app” also
        deletes the “site”, and search for “project” never finds the button.
      </p>
    </div>
  );
}
