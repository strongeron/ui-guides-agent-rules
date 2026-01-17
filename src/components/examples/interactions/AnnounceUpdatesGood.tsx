import { useState } from 'react';

export function AnnounceUpdatesGood() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Save Changes
        </button>

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="mt-4"
        >
          {saved && (
            <div className="p-3 bg-green-100 text-green-800 rounded-lg text-sm">
              ✓ Changes saved successfully
            </div>
          )}
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          The aria-live region announces the message to screen readers when it appears.
        </p>
      </div>
      <p className="text-xs text-green-700 mt-4">
        aria-live="polite" announces updates to screen readers
      </p>
    </div>
  );
}
