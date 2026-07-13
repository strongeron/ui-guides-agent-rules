import { useState } from 'react';

type State = 'empty' | 'sparse' | 'dense' | 'error';
const states: State[] = ['empty', 'sparse', 'dense', 'error'];

export function AllStatesBad() {
  const [state, setState] = useState<State>('empty');

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex gap-1">
        {states.map((s) => (
          <button
            key={s}
            onClick={() => setState(s)}
            className={`px-2 py-1 rounded text-xs capitalize transition-colors ${
              state === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg p-4 min-h-[200px] overflow-hidden">
        <h3 className="font-semibold mb-3">Your projects</h3>

        {/* Only the happy path was ever designed. */}
        {state === 'empty' && (
          <div className="border border-dashed border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground text-sm">No projects</p>
          </div>
        )}

        {state === 'sparse' && <div className="rounded-md border border-border p-2 text-sm">Onboarding flow</div>}

        {state === 'dense' && (
          <div className="space-y-1">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="rounded-md border border-border p-2 text-sm whitespace-nowrap">
                Project {i + 1}: a deliberately long name that must truncate cleanly
              </div>
            ))}
          </div>
        )}

        {state === 'error' && <div className="text-sm">Error: undefined</div>}
      </div>

      <p className="text-xs text-destructive">
        Only the happy path was designed. Empty offers no next step, dense overflows its container instead of
        scrolling, and the error is a raw string with no way to recover
      </p>
    </div>
  );
}
