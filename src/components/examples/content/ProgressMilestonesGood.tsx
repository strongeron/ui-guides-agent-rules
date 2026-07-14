import { useState } from 'react';

// Exactly the same 47 tasks as the bad example — grouped into four named phases.
const PHASES = [
  { name: 'Identity', steps: ['Verify your email', 'Set your display name', 'Add a photo'] },
  { name: 'Workspace', steps: ['Pick a timezone', 'Name your workspace', 'Invite a teammate'] },
  { name: 'Billing', steps: ['Connect a card', 'Choose a plan'] },
  { name: 'First deploy', steps: ['Install the CLI', 'Create a project', 'Ship it'] },
];

export function ProgressMilestonesGood() {
  const [phase, setPhase] = useState(0);

  const current = PHASES[phase];
  const finished = phase >= PHASES.length;

  return (
    <div className="w-full max-w-md space-y-3">
      <div className="space-y-3 rounded-lg border border-border bg-card p-5">
        {finished ? (
          <p className="text-sm font-medium text-success">
            All four phases done — you are set up.
          </p>
        ) : (
          <>
            <h4 className="text-lg font-semibold text-foreground">
              Phase {phase + 1} of {PHASES.length} · {current.name}
            </h4>

            <ol className="space-y-1 text-sm text-muted-foreground">
              {current.steps.map((step) => (
                <li key={step} className="flex items-center gap-2">
                  <span
                    className="size-3 shrink-0 rounded-sm border border-border"
                    aria-hidden="true"
                  />
                  {step}
                </li>
              ))}
            </ol>
          </>
        )}

        {/* Completed phases collapse to a done marker — the remaining work visibly shrinks. */}
        <ul className="flex flex-wrap gap-2 border-t border-border pt-3 text-xs">
          {PHASES.map((p, i) => (
            <li
              key={p.name}
              className={
                i < phase
                  ? 'rounded-full border border-border bg-muted px-2 py-1 text-success'
                  : i === phase
                    ? 'rounded-full bg-primary px-2 py-1 font-medium text-primary-foreground'
                    : 'rounded-full border border-border px-2 py-1 text-muted-foreground'
              }
            >
              {i < phase ? `✓ ${p.name}` : p.name}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setPhase((p) => Math.min(PHASES.length, p + 1))}
          disabled={finished}
          className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {finished ? 'Done' : `Finish ${current.name}`}
        </button>
      </div>

      <p className="text-xs text-success">
        Same 47 tasks, four milestones. Each press retires a whole phase, and the
        list of what is left gets shorter — progress reads as ground gained, not
        debt outstanding.
      </p>
    </div>
  );
}
