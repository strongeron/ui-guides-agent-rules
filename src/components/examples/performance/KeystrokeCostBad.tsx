import { useRef, useState } from 'react';

/** Deliberately expensive subtree: re-rendering it costs real milliseconds. */
function ExpensivePreview({ text }: { text: string }) {
  const renders = useRef(0);
  renders.current += 1;

  // Busy work — stands in for a chart, editor, or big formatted list.
  let sum = 0;
  for (let i = 0; i < 2_000_000; i++) sum += i % 7;
  void sum;

  return (
    <div className="mt-3 rounded-md bg-muted p-2">
      <div className="text-xs text-muted-foreground">Preview: {text || 'empty'}</div>
      <div className="mt-1 text-xs font-medium tabular-nums text-error">
        expensive renders: {renders.current}
      </div>
    </div>
  );
}

export function KeystrokeCostBad() {
  const [text, setText] = useState('');
  const keystrokes = useRef(0);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <label htmlFor="kc-bad" className="mb-1 block text-xs font-medium text-foreground">
          Search
        </label>
        <input
          id="kc-bad"
          value={text}
          onChange={(e) => {
            keystrokes.current += 1;
            setText(e.target.value);
          }}
          placeholder="Type quickly here..."
          className="w-full rounded-lg border border-border bg-background px-3 py-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        />
        <div className="mt-2 text-xs tabular-nums text-muted-foreground">
          keystrokes: {keystrokes.current}
        </div>
        <ExpensivePreview text={text} />
      </div>
      <p className="text-xs text-error">
        Controlled input wired straight into an expensive subtree: one expensive render per keystroke
        (1:1). Type fast and the field lags behind your fingers.
      </p>
    </div>
  );
}
