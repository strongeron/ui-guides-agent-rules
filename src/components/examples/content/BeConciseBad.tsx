const HEADING = 'Deployment Configuration Settings Overview Panel';

// Words that carry no information — the render highlights them in place.
const FILLER = new Set([
  'in',
  'order',
  'to',
  'please',
  'note',
  'that',
  'at',
  'this',
  'time',
  'simply',
  'basically',
  'just',
  'currently',
  'various',
  'different',
  'kindly',
  'proceed',
  'ahead',
]);

const BODY =
  'Please note that in order to proceed ahead with this action, you will simply need to kindly review the various different settings that are currently configured for this particular project at this time.';

const BUTTON =
  'Click Here in Order to Proceed Ahead and Save All of the Configuration Settings That You Have Currently Changed';

function countWords(text: string) {
  return text.trim().split(/\s+/).length;
}

function Highlighted({ text, className }: { text: string; className: string }) {
  return (
    <span className={className}>
      {text.split(/(\s+)/).map((chunk, i) => {
        if (!chunk.trim()) return chunk;
        const bare = chunk.toLowerCase().replace(/[.,]/g, '');
        return FILLER.has(bare) ? (
          <mark key={i} className="rounded bg-error/15 px-0.5 font-semibold text-error">
            {chunk}
          </mark>
        ) : (
          <span key={i}>{chunk}</span>
        );
      })}
    </span>
  );
}

export function BeConciseBad() {
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <h4 className="font-medium text-foreground">{HEADING}</h4>
        <Highlighted text={BODY} className="block text-sm leading-[1.6] text-muted-foreground" />
        <button
          type="button"
          className="w-full rounded-md border border-border bg-muted px-3 py-2 text-left text-sm font-medium text-foreground"
        >
          <Highlighted text={BUTTON} className="block text-sm font-medium text-foreground" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-error">
          body: {countWords(BODY)} words
        </span>
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-error">
          button: {countWords(BUTTON)} words
        </span>
      </div>

      <p className="text-xs text-error">
        The highlighted words can all be deleted without changing the meaning. A 19-word button
        pushes the verb — “Save” — past the point where anyone is still reading.
      </p>
    </div>
  );
}
