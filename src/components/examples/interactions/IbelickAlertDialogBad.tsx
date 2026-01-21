import { useState } from 'react';

export function IbelickAlertDialogBad() {
  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    // No confirmation - immediate deletion
    setDeleted(true);
  };

  return (
    <div className="space-y-4">
      {!deleted ? (
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-medium">Project: My Important Work</p>
          <p className="text-sm text-muted-foreground mt-1">Created 3 months ago</p>
          <button
            onClick={handleDelete}
            className="mt-3 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg"
          >
            Delete Project
          </button>
        </div>
      ) : (
        <div className="p-4 bg-destructive/10 rounded-lg">
          <p className="text-destructive font-medium">Project deleted!</p>
          <p className="text-sm text-muted-foreground mt-1">No way to recover it...</p>
        </div>
      )}
      <p className="text-xs text-destructive">
        No confirmation dialog - one misclick and data is gone forever
      </p>
    </div>
  );
}
