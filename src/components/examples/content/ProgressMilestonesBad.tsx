import { useState } from 'react';

const TOTAL_TASKS = 47;

const TASKS = [
  'Verify your email address',
  'Add a profile photo',
  'Set your display name',
  'Choose a timezone',
  'Connect a payment method',
  'Invite a teammate',
  'Install the CLI',
  'Create your first project',
];

export function ProgressMilestonesBad() {
  const [done, setDone] = useState(10);

  const percent = Math.round((done / TOTAL_TASKS) * 100);
  const remaining = TOTAL_TASKS - done;

  return (
    <div className="w-full max-w-md space-y-3">
      <div className="space-y-3 rounded-lg border border-border bg-card p-5">
        <div className="flex items-baseline justify-between">
          <h4 className="font-mono text-lg font-semibold tabular-nums text-foreground">
            {done} / {TOTAL_TASKS} complete
          </h4>
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            {percent}%
          </span>
        </div>

        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Setup progress"
          className="h-2 w-full overflow-hidden rounded-full bg-muted"
        >
          <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
        </div>

        <p className="text-xs text-muted-foreground">
          {remaining} tasks remaining
        </p>

        <ul className="space-y-1 text-sm text-muted-foreground">
          {TASKS.map((task) => (
            <li key={task} className="flex items-center gap-2">
              <span className="size-3 shrink-0 rounded-sm border border-border" aria-hidden="true" />
              {task}
            </li>
          ))}
          {remaining > TASKS.length && (
            <li className="pl-5 text-xs italic">…and {remaining - TASKS.length} more</li>
          )}
        </ul>

        <button
          type="button"
          onClick={() => setDone((d) => Math.min(TOTAL_TASKS, d + 1))}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Complete a task
        </button>
      </div>

      <p className="text-xs text-error">
        Press it: the bar crawls ~2% and the list never gets shorter. The count is
        accurate and demoralizing — the salient number is the 37 tasks still owed.
      </p>
    </div>
  );
}
