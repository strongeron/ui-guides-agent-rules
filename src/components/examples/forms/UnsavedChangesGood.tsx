import { useState, useEffect } from 'react';

export function UnsavedChangesGood() {
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    if (content) {
      setSaved(false);
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!saved && content) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [content, saved]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    alert('Saved!');
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!saved && content) {
      if (confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        setContent('');
        setSaved(true);
      }
    } else {
      setContent('');
    }
  };

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label htmlFor="good-unsaved-content" className="block text-sm font-medium text-foreground mb-1">
            Your Post {!saved && <span className="text-orange-600">(unsaved)</span>}
          </label>
          <textarea
            id="good-unsaved-content"
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
            onClick={handleCancel}
            className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-accent transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
      <p className="text-xs text-success mt-4">
        Warns before navigation with unsaved changes
      </p>
    </div>
  );
}
