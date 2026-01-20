import { useState } from 'react';

export function IbelickAlertDialogGood() {
  const [showDialog, setShowDialog] = useState(false);
  const [deleted, setDeleted] = useState(false);

  // Note: In production, use Radix AlertDialog:
  // import * as AlertDialog from '@radix-ui/react-alert-dialog';

  const handleDelete = () => {
    setDeleted(true);
    setShowDialog(false);
  };

  return (
    <div className="space-y-4">
      {!deleted ? (
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-medium">Project: My Important Work</p>
          <p className="text-sm text-muted-foreground mt-1">Created 3 months ago</p>
          <button
            onClick={() => setShowDialog(true)}
            className="mt-3 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg"
          >
            Delete Project
          </button>
        </div>
      ) : (
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-medium">Project deleted</p>
        </div>
      )}

      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" role="alertdialog">
          <div className="bg-background p-6 rounded-lg shadow-lg max-w-sm mx-4">
            <h3 className="font-semibold text-lg">Delete Project?</h3>
            <p className="text-sm text-muted-foreground mt-2">
              This action cannot be undone. This will permanently delete your project and all associated data.
            </p>
            <div className="flex gap-3 mt-4 justify-end">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 border rounded-lg hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <p className="text-xs text-success">
        AlertDialog requires explicit confirmation before destructive action
      </p>
    </div>
  );
}
