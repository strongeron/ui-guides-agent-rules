// One convention: SCREAMING_SNAKE for strings, a monotone digit run for numbers.
const PLACEHOLDER_PATTERN = /(YOUR_API_TOKEN_HERE|YOUR_TEAM_ID_HERE|0123456789)/g;

const SNIPPET = [
  'export API_TOKEN=YOUR_API_TOKEN_HERE',
  'export TEAM_ID=YOUR_TEAM_ID_HERE',
  '',
  'curl https://api.example.com/v1/projects/0123456789 \\',
  '  -H "Authorization: Bearer YOUR_API_TOKEN_HERE" \\',
  '  -H "X-Team: YOUR_TEAM_ID_HERE" \\',
  '  -d \'{ "retries": 3 }\'',
];

function Line({ text }: { text: string }) {
  const parts = text.split(PLACEHOLDER_PATTERN);
  return (
    <div className="whitespace-pre-wrap font-mono text-xs text-foreground">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded bg-success/15 px-1 font-semibold text-success">
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

export function ConsistentPlaceholdersGood() {
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="space-y-1 rounded-lg border border-border bg-muted p-4">
        {SNIPPET.map((line, i) => (
          <Line key={i} text={line} />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-success">
          1 placeholder convention · strings: NAME_HERE · numbers: 0123456789
        </span>
      </div>

      <p className="text-xs text-success">
        Every slot is loud, obviously fake, and greppable. <code className="rounded bg-card px-1 font-mono">3</code>{' '}
        is plainly a literal because it does not look like a placeholder, and a single
        search-and-replace fills the whole page in.
      </p>
    </div>
  );
}
