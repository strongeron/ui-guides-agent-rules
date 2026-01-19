import { useState } from 'react';

const statusClasses = {
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-black',
  error: 'bg-red-500 text-white',
} as const;

type Status = keyof typeof statusClasses;

export function DynamicClassesGood() {
  const [status, setStatus] = useState<Status>('success');

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Status Badge</h4>
        <div className="flex gap-2 mb-4">
          {(Object.keys(statusClasses) as Status[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1 rounded text-sm capitalize ${
                status === s ? 'ring-2 ring-primary' : ''
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className={`px-4 py-2 rounded ${statusClasses[status]}`}>
          Current: {status}
        </div>
      </div>
      <div className="bg-muted rounded p-3 font-mono text-xs">
        <pre>{`const statusClasses = {
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
};`}</pre>
      </div>
      <p className="text-xs text-success">
        Complete class strings are detectable by Tailwind's purge
      </p>
    </div>
  );
}
