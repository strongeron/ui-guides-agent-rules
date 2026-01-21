import { useState } from 'react';

export function DynamicClassesBad() {
  const [color, setColor] = useState('green');
  const colors = ['green', 'yellow', 'red'];

  // This pattern breaks in production!
  const dynamicClass = `bg-${color}-500`;

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Status Badge</h4>
        <div className="flex gap-2 mb-4">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`px-3 py-1 rounded text-sm capitalize ${
                color === c ? 'ring-2 ring-primary' : ''
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="px-4 py-2 rounded bg-muted text-muted-foreground">
          Would be: {dynamicClass}
        </div>
      </div>
      <div className="bg-muted rounded p-3 font-mono text-xs">
        <pre className="text-error">{`// Tailwind can't detect this!
const dynamicClass = \`bg-\${color}-500\`;`}</pre>
      </div>
      <p className="text-xs text-error">
        Dynamic class construction is purged in production builds
      </p>
    </div>
  );
}
