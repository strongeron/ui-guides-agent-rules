const NEGATIVE_PATTERN = /\b(You failed|Invalid|aborted|Denied|cannot|Failure|illegal)\b/g;

const MESSAGES = [
  'avatar.png is 12 MB — a little over the 8 MB limit.',
  'Compress it, or upload a JPEG or PNG under 8 MB.',
  'Nothing else was lost; your other files are still here.',
];

const offenders = MESSAGES.flatMap((m) => m.match(NEGATIVE_PATTERN) ?? []);

export function PositiveLanguageGood() {
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="space-y-2 rounded-lg border border-border bg-card p-4">
        <h4 className="text-sm font-medium text-foreground">This file needs a little trimming</h4>
        {MESSAGES.map((message) => (
          <p key={message} className="text-sm text-muted-foreground">
            {message}
          </p>
        ))}
        <button
          type="button"
          className="mt-1 rounded-md border border-border bg-muted px-3 py-1.5 text-sm font-medium text-foreground"
        >
          Choose Another File
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-success">
          {offenders.length} blame / dead-end words
        </span>
        <span className="text-muted-foreground">1 forward path</span>
      </div>

      <p className="text-xs text-success">
        Same facts — same file, same 8 MB limit — with no culprit and an exit. Positive framing is
        not vagueness: the number, the cause, and the accepted formats are all still on screen.
      </p>
    </div>
  );
}
