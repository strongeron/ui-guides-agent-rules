import { useState } from 'react';

const itemClass =
  'w-full text-left px-3 py-2 bg-card rounded text-sm border border-border transition-colors hover:bg-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring';

export function EllipsisForInputBad() {
  const [saving, setSaving] = useState(false);

  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2 bg-muted rounded-lg p-4">
        <p className="text-xs text-muted-foreground">Menu</p>
        <button className={itemClass}>Open</button>
        <button className={itemClass}>Rename</button>
        <button className={itemClass}>Delete</button>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Processing state (click it)</p>
        <button
          onClick={save}
          disabled={saving}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm transition-colors duration-150 ease-out hover:bg-primary/90 disabled:opacity-70"
        >
          Save
        </button>
      </div>

      <p className="text-xs text-destructive">
        Nothing signals which actions open a follow-up, and the button still reads <code>Save</code> while it is
        saving, so there is no cue that work is in flight
      </p>
    </div>
  );
}
