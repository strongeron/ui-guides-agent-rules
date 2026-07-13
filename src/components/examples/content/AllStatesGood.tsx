import { useState } from 'react';

type State = 'empty' | 'sparse' | 'dense' | 'error';
const states: State[] = ['empty', 'sparse', 'dense', 'error'];

export function AllStatesGood() {
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

      <div className="bg-card border border-border rounded-lg p-4 min-h-[200px]">
        <h3 className="font-semibold mb-3">Your projects</h3>

        {state === 'empty' && (
          <div className="border border-dashed border-border rounded-lg p-6 text-center">
            <h4 className="font-medium mb-1">No projects yet</h4>
            <p className="text-sm text-muted-foreground mb-3">Create your first project to get started.</p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90">
              Create project
            </button>
          </div>
        )}

        {state === 'sparse' && (
          <div className="space-y-2">
            <div className="rounded-md border border-border p-2 text-sm">Onboarding flow</div>
            <p className="text-xs text-muted-foreground">
              Just one project so far. The layout does not look broken with a single row.
            </p>
          </div>
        )}

        {state === 'dense' && (
          <div className="max-h-32 overflow-y-auto overscroll-contain space-y-1 pr-1">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="rounded-md border border-border p-2 text-sm truncate">
                Project {i + 1}: a deliberately long name that must truncate cleanly
              </div>
            ))}
          </div>
        )}

        {state === 'error' && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4">
            <h4 className="font-medium text-destructive mb-1">Could not load projects</h4>
            <p className="text-sm text-muted-foreground mb-3">Check your connection and try again.</p>
            <button className="px-3 py-1.5 rounded-md border border-border text-sm hover:bg-muted">Retry</button>
          </div>
        )}
      </div>

      <p className="text-xs text-success">
        All four states are designed: empty, sparse, dense (scrolls and truncates) and error (explains and offers a
        retry). Switch between them
      </p>
    </div>
  );
}
