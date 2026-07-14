import { useRef, useState } from 'react';

/**
 * Good: the inline / progressive alternatives are exhausted first.
 *
 * - Rename → edits in place. The row never moves, focus never leaves it.
 * - Delete → optimistic removal plus an undo toast. Cheap to reverse, so it does
 *   not deserve a confirmation at all.
 * - Details → a side panel. The list stays visible next to it.
 * - The one modal left is reserved for the genuinely destructive, irreversible
 *   action: deleting the whole workspace.
 */
export function ImpeccableModalLastResortGood() {
  const [name, setName] = useState('acme-api');
  const [editing, setEditing] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const deleteBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="w-full space-y-3">
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="mb-3 text-sm font-semibold text-foreground">Projects</h4>

        {deleted ? (
          <div className="flex items-center justify-between rounded-md border border-border bg-muted px-3 py-2">
            <span className="text-xs text-muted-foreground">Deleted &ldquo;{name}&rdquo;</span>
            <button
              onClick={() => setDeleted(false)}
              className="rounded-md border border-border px-2 py-1 text-xs font-medium text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              Undo
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2">
            {editing ? (
              // Rename: inline, in the row itself
              <input
                autoFocus
                value={name}
                aria-label="Project name"
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setEditing(false)}
                onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
                className="min-w-0 flex-1 rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              />
            ) : (
              <span className="min-w-0 flex-1 truncate text-sm text-foreground">{name}</span>
            )}
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => setEditing(true)}
                className="rounded-md border border-border px-2 py-1 text-xs text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                Rename
              </button>
              <button
                onClick={() => setPanelOpen((v) => !v)}
                aria-expanded={panelOpen}
                className="rounded-md border border-border px-2 py-1 text-xs text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                Details
              </button>
              <button
                onClick={() => setDeleted(true)}
                className="rounded-md border border-border px-2 py-1 text-xs text-error focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Details: a side panel, the list stays visible */}
        {panelOpen && (
          <aside className="mt-3 rounded-md border border-border bg-muted p-3">
            <p className="text-xs font-semibold text-foreground">Details</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Region eu-central-1 &middot; 3 deployments &middot; created Mar 2026
            </p>
          </aside>
        )}
      </div>

      {/* The one action that earns a modal: destructive and irreversible */}
      <div className="rounded-lg border border-error bg-card p-4">
        <p className="text-xs font-semibold text-foreground">Danger zone</p>
        <button
          ref={deleteBtnRef}
          onClick={() => setConfirmOpen(true)}
          className="mt-2 rounded-md border border-error px-2 py-1 text-xs text-error focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Delete workspace permanently
        </button>

        {confirmOpen && (
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="ws-delete-title"
            className="mt-3 rounded-md border border-error bg-muted p-3"
          >
            <p id="ws-delete-title" className="text-xs font-semibold text-foreground">
              Delete workspace and all 14 projects?
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              This cannot be undone. There is nothing to undo it with.
            </p>
            <div className="mt-2 flex gap-2">
              <button
                autoFocus
                onClick={() => {
                  setConfirmOpen(false);
                  deleteBtnRef.current?.focus();
                }}
                className="rounded-md border border-border px-2 py-1 text-xs text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setConfirmOpen(false);
                  deleteBtnRef.current?.focus();
                }}
                className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                Delete workspace
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-success">
        Three interactions, zero modals: rename edits in place, delete is undoable, details open
        beside the list. The modal is spent on the one action that cannot be taken back.
      </p>
    </div>
  );
}
