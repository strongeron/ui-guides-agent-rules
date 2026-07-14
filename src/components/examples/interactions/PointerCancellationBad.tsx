import { useState } from 'react';

const INITIAL = ['Q3 forecast.xlsx', 'Offsite photos', 'contract-final.pdf'];

export function PointerCancellationBad() {
  const [files, setFiles] = useState(INITIAL);
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

            {/* The destructive action executes on the DOWN-event. By the time the
                finger has landed, the file is already gone. Sliding off before
                release cannot save you, because release is never consulted. */}
            <button
              type="button"
              onPointerDown={() => {
                setFiles((prev) => prev.filter((f) => f !== file));
                setLog(`Deleted "${file}" on pointerdown`);
              }}
              className="rounded bg-destructive px-2 py-1 text-xs text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
        <p className="text-xs text-destructive">{log ?? 'Nothing deleted yet.'}</p>
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
        Press <em>Delete</em> and — without releasing — drag your pointer far away, then
        let go. The file is already deleted. There was never a moment to change your
        mind. For someone with a tremor, or anyone whose finger lands slightly off on a
        phone, the down-event is the whole interaction.
      </p>

      <p className="mt-2 text-xs text-destructive">
        The down-event executes the function, so the press cannot be aborted — WCAG 2.5.2 failure
      </p>
    </div>
  );
}
