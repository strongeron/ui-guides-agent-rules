import { useState } from 'react';

const INITIAL = ['Q3 forecast.xlsx', 'Offsite photos', 'contract-final.pdf'];

export function PointerCancellationGood() {
  const [files, setFiles] = useState(INITIAL);
  const [pressing, setPressing] = useState<string | null>(null);
  const [log, setLog] = useState<string | null>(null);

  return (
    <div className="w-full max-w-sm">
      <ul className="space-y-2 rounded-lg border border-border bg-card p-3">
        {files.map((file) => (
          <li
            key={file}
            className="flex items-center justify-between gap-3 rounded border border-border bg-muted px-3 py-2"
          >
            <span className="text-sm text-foreground">{file}</span>

            {/* The down-event only PREVIEWS: it arms the button and shows the hint.
                onClick is the up-event on the same target, so releasing anywhere
                else silently aborts — the browser's own cancellation mechanism. */}
            <button
              type="button"
              onPointerDown={() => {
                setPressing(file);
                setLog(null);
              }}
              onPointerUp={() => setPressing(null)}
              onPointerLeave={() => {
                if (pressing === file) {
                  setPressing(null);
                  setLog(`Aborted — released "${file}" off-target, nothing deleted`);
                }
              }}
              onPointerCancel={() => setPressing(null)}
              onClick={() => {
                setFiles((prev) => prev.filter((f) => f !== file));
                setLog(`Deleted "${file}" on release`);
              }}
              className={`rounded px-2 py-1 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                pressing === file
                  ? 'bg-destructive text-destructive-foreground'
                  : 'border border-border text-destructive'
              }`}
            >
              Delete
            </button>
          </li>
        ))}
        {files.length === 0 && (
          <li className="px-3 py-2 text-sm text-muted-foreground">No files left.</li>
        )}
      </ul>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-foreground">
          {pressing
            ? `Armed — release on "${pressing}" to confirm, slide off to cancel`
            : (log ?? 'Nothing deleted yet.')}
        </p>
        <button
          type="button"
          onClick={() => {
            setFiles(INITIAL);
            setLog(null);
          }}
          className="shrink-0 rounded border border-border px-2 py-1 text-xs text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Reset
        </button>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Press <em>Delete</em> and hold — the button arms and tells you how to escape.
        Slide off before releasing and nothing happens: <code>click</code> only fires
        when the up-event lands on the same element as the down-event. Release on the
        button and the file goes. This is opening-a-menu-on-mousedown&apos;s sibling
        rule, not its opposite: preview on down, <em>commit</em> on up.
      </p>

      <p className="mt-2 text-xs text-success">
        The up-event completes the function, so any press can still be aborted
      </p>
    </div>
  );
}
