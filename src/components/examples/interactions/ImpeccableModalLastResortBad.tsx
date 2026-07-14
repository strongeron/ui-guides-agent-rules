import { useState } from 'react';

type Layer = 'rename' | 'confirm' | 'details';

/**
 * Bad: the modal is the first thought for every interaction.
 *
 * Renaming a project, confirming a delete, and viewing details each throw a
 * modal. Open two and they stack — each one steals focus, blocks the page, and
 * hides the very row you were acting on, so you lose the context you needed to
 * decide.
 */
export function ImpeccableModalLastResortBad() {
  const [stack, setStack] = useState<Layer[]>([]);

  const open = (layer: Layer) => setStack((s) => [...s, layer]);
  const popTop = () => setStack((s) => s.slice(0, -1));

  const titles: Record<Layer, string> = {
    rename: 'Rename project',
    confirm: 'Delete project?',
    details: 'Project details',
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-border bg-card">
      {/* The page underneath */}
      <div className="space-y-3 p-4">
        <h4 className="text-sm font-semibold text-foreground">Projects</h4>
        <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
          <span className="text-sm text-foreground">acme-api</span>
          <div className="flex gap-2">
            <button
              onClick={() => open('rename')}
              className="rounded-md border border-border px-2 py-1 text-xs text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              Rename
            </button>
            <button
              onClick={() => open('details')}
              className="rounded-md border border-border px-2 py-1 text-xs text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              Details
            </button>
            <button
              onClick={() => open('confirm')}
              className="rounded-md border border-border px-2 py-1 text-xs text-error focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              Delete
            </button>
          </div>
        </div>
        <p className="text-xs text-error">
          Every one of these three opens a modal. Open two &mdash; they stack, and the row you were
          working on is gone.
        </p>
      </div>

      {/* Stacked modals, each blocking the one below */}
      {stack.length > 0 && (
        <div className="absolute inset-0 bg-overlay">
          {stack.map((layer, i) => (
            <div
              key={`${layer}-${i}`}
              className="absolute left-1/2 w-64 -translate-x-1/2 rounded-lg border border-border bg-card p-4 shadow-lg"
              style={{ top: `${12 + i * 18}px` }}
            >
              <p className="text-sm font-semibold text-foreground">{titles[layer]}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Layer {i + 1} of {stack.length}. The project row is behind this.
              </p>
              <button
                onClick={popTop}
                className="mt-3 rounded-md border border-border px-2 py-1 text-xs text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                Close
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
