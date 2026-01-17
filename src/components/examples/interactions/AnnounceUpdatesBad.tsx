import { useState } from 'react';

export function AnnounceUpdatesBad() {
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

        {saved && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm">
            ✓ Changes saved successfully
          </div>
        )}

        <p className="mt-4 text-xs text-muted-foreground">
          The success message appears visually, but screen readers aren't notified of the change.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        No aria-live - screen readers miss the notification
      </p>
    </div>
  );
}
