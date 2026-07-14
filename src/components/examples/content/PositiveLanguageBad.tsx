// Blame words and dead-end words — the framing failure, not the missing fix.
const NEGATIVE_PATTERN = /\b(You failed|Invalid|aborted|Denied|cannot|Failure|illegal)\b/g;

const MESSAGES = [
  'You failed to upload avatar.png.',
  'Invalid file. Operation aborted.',
  'Denied: you cannot use that file type.',
  'Failure: illegal file size.',
];

const offenders = MESSAGES.flatMap((m) => m.match(NEGATIVE_PATTERN) ?? []);

function Highlighted({ text }: { text: string }) {
  const parts = text.split(NEGATIVE_PATTERN);
  return (
    <span className="text-sm text-foreground">
      {parts.map((part, i) =>
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

export function PositiveLanguageBad() {
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="space-y-2 rounded-lg border border-error/40 bg-card p-4">
        <h4 className="text-sm font-medium text-error">Upload failed</h4>
        {MESSAGES.map((message) => (
          <p key={message}>
            <Highlighted text={message} />
          </p>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-error">
          {offenders.length} blame / dead-end words
        </span>
        <span className="text-muted-foreground">0 forward paths</span>
      </div>

      <p className="text-xs text-error">
        Every sentence makes the reader the culprit and then stops. “Aborted” closes the door;
        “invalid” and “illegal” judge without saying what the limit actually is.
      </p>
    </div>
  );
}
