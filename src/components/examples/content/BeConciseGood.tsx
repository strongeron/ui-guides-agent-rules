const HEADING = 'Deployment Settings';

const BODY = 'Review your project settings before you deploy.';

const BUTTON = 'Save Settings';

function countWords(text: string) {
  return text.trim().split(/\s+/).length;
}

export function BeConciseGood() {
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <h4 className="font-medium text-foreground">{HEADING}</h4>
        <p className="text-sm leading-[1.6] text-muted-foreground">{BODY}</p>
        <button
          type="button"
          className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground"
        >
          {BUTTON}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-success">
          body: {countWords(BODY)} words
        </span>
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-success">
          button: {countWords(BUTTON)} words
        </span>
      </div>

      <p className="text-xs text-success">
        Same instruction, same action, none of the ceremony. The verb is the first word on the
        button, so the button is readable at a glance instead of at a read.
      </p>
    </div>
  );
}
