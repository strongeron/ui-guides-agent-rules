// Fill-me-in tokens inside a docs code sample — not the <input placeholder> attribute.
const PLACEHOLDER_PATTERN = /(<your-token>|xxx|abc123|\[INSERT KEY\]|123|0000)/g;

const SNIPPET = [
  'export API_TOKEN=<your-token>',
  'export TEAM_ID=abc123',
  '',
  'curl https://api.example.com/v1/projects/123 \\',
  '  -H "Authorization: Bearer xxx" \\',
  '  -H "X-Team: [INSERT KEY]" \\',
  '  -d \'{ "retries": 0000 }\'',
];

const CONVENTIONS = new Set(
  SNIPPET.flatMap((line) => line.match(PLACEHOLDER_PATTERN) ?? []),
);

function Line({ text }: { text: string }) {
  const parts = text.split(PLACEHOLDER_PATTERN);
  return (
    <div className="whitespace-pre-wrap font-mono text-xs text-foreground">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded bg-error/15 px-1 font-semibold text-error">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
      {text === '' && ' '}
    </div>
  );
}

export function ConsistentPlaceholdersBad() {
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="space-y-1 rounded-lg border border-border bg-muted p-4">
        {SNIPPET.map((line, i) => (
          <Line key={i} text={line} />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-error">
          {CONVENTIONS.size} placeholder conventions in 1 snippet
        </span>
      </div>

      <p className="text-xs text-error">
        Which of these are literals? <code className="rounded bg-muted px-1 font-mono">abc123</code>{' '}
        and <code className="rounded bg-muted px-1 font-mono">123</code> look like real values, so
        they get pasted as-is and the request 401s. Nothing here is greppable.
      </p>
    </div>
  );
}
