import { useState } from 'react';

export function LatencyBudgetsGood() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleSave = () => {
    setStatus('loading');
    // Fast API call under 500ms
    setTimeout(() => setStatus('done'), 350);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={handleSave}
            disabled={status === 'loading'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {status === 'loading' ? 'Saving...' : 'Save Changes'}
          </button>
          {status === 'done' && (
            <span className="text-green-600 text-sm">✓ Saved</span>
          )}
        </div>
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-sm text-green-800">
            <div className="font-medium">API Response Time</div>
            <div className="text-xs mt-1 font-mono">POST /api/save → 350ms ✓</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Sub-500ms response feels instant. Users stay confident the action worked.
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        350ms mutation latency feels instant
      </p>
    </div>
  );
}
