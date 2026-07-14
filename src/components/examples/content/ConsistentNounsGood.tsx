const TERM_PATTERN = /\b(project|Project)\b/g;

const LINES = [
  { label: 'Heading', text: 'Project settings' },
  { label: 'Subhead', text: 'Configure how your project builds and runs.' },
  { label: 'Field', text: 'Project name' },
  { label: 'Help text', text: 'This name appears in the URL of every project preview.' },
  { label: 'Button', text: 'Delete this project' },
  { label: 'Toast', text: 'Your project was removed.' },
];

const UNIQUE_TERMS = new Set(
  LINES.flatMap((line) => line.text.match(TERM_PATTERN) ?? []).map((term) => term.toLowerCase()),
);

function Highlighted({ text }: { text: string }) {
  const parts = text.split(TERM_PATTERN);
  return (
    <span className="text-sm text-foreground">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded bg-success/15 px-1 font-semibold text-success">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}

export function ConsistentNounsGood() {
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
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-success">
          unique terms: 4 → {UNIQUE_TERMS.size}
        </span>
        <span className="text-muted-foreground">
          {[...UNIQUE_TERMS].join(' · ')} — everywhere, no exceptions
        </span>
      </div>

      <p className="text-xs text-success">
        One noun per concept. The button, the toast, the docs, and the API all say “project”, so
        search works and nobody wonders if these are different objects.
      </p>
    </div>
  );
}
