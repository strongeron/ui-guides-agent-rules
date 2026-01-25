import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export function IbelickAlertDialogGood() {
  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    setDeleted(true);
  };

  return (
    <div className="space-y-4">
      {!deleted ? (
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-medium">Project: My Important Work</p>
          <p className="text-sm text-muted-foreground mt-1">Created 3 months ago</p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="mt-3">
                Delete Project
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Project?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your project and all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={handleDelete}>
                  Yes, Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-medium">Project deleted</p>
        </div>
      )}
      <p className="text-xs text-success">
        AlertDialog component requires explicit confirmation before destructive action
      </p>
    </div>
  );
}
