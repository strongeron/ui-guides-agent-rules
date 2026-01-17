import { useState } from 'react';

export function UnsavedChangesBad() {
  const [content, setContent] = useState('');

  return (
    <div className="w-full max-w-sm">
      <form className="space-y-4">
        <div>
          <label htmlFor="bad-unsaved-content" className="block text-sm font-medium text-foreground mb-1">
            Your Post
          </label>
          <textarea
            id="bad-unsaved-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            placeholder="Write something..."
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
          <a
            href="#"
            className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-accent transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
      <p className="text-xs text-red-700 mt-4">
        No warning when navigating away with unsaved changes
      </p>
    </div>
  );
}
