import { useState } from 'react';

export function LatencyBudgetsBad() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleSave = () => {
    setStatus('loading');
    // Simulating a slow 2+ second API call
    setTimeout(() => setStatus('done'), 2500);
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
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-sm text-red-800">
            <div className="font-medium">API Response Time</div>
            <div className="text-xs mt-1 font-mono">POST /api/save → 2,500ms</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          2.5 second response feels broken. Users may click again or leave.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        2.5s mutation latency feels unresponsive
      </p>
    </div>
  );
}
