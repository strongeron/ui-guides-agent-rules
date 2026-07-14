import { useRef, useState } from 'react';

/** Same expensive subtree as the bad example — the difference is how often it runs. */
function ExpensivePreview({ text }: { text: string }) {
  const renders = useRef(0);
  renders.current += 1;

  let sum = 0;
  for (let i = 0; i < 2_000_000; i++) sum += i % 7;
  void sum;

  return (
    <div className="mt-3 rounded-md bg-muted p-2">
      <div className="text-xs text-muted-foreground">Preview: {text || 'empty'}</div>
      <div className="mt-1 text-xs font-medium tabular-nums text-success">
        expensive renders: {renders.current}
      </div>
    </div>
  );
}

export function KeystrokeCostGood() {
  // The input owns its own value (uncontrolled). React never re-renders while typing.
  const inputRef = useRef<HTMLInputElement>(null);
  const keystrokeRef = useRef(0);
  const keystrokeDisplayRef = useRef<HTMLDivElement>(null);

  // Only this commits a render — and only when the user asks for a result.
  const [submitted, setSubmitted] = useState('');

  return (
    <form
      className="w-full max-w-sm space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(inputRef.current?.value ?? '');
      }}
    >
      <div className="rounded-lg border border-border bg-card p-4">
        <label htmlFor="kc-good" className="mb-1 block text-xs font-medium text-foreground">
          Search
        </label>
        <input
          id="kc-good"
          ref={inputRef}
          defaultValue=""
          onInput={() => {
            keystrokeRef.current += 1;
            // Direct DOM write — no state, no render.
            if (keystrokeDisplayRef.current) {
              keystrokeDisplayRef.current.textContent = `keystrokes: ${keystrokeRef.current}`;
            }
          }}
          placeholder="Type quickly here..."
          className="w-full rounded-lg border border-border bg-background px-3 py-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        />
        <div ref={keystrokeDisplayRef} className="mt-2 text-xs tabular-nums text-muted-foreground">
          keystrokes: 0
        </div>
        <button
          type="submit"
          className="mt-2 rounded-lg bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Preview
        </button>
        <ExpensivePreview text={submitted} />
      </div>
      <p className="text-xs text-success">
        Uncontrolled input via <code>defaultValue</code> + ref: typing costs zero renders. The
        expensive subtree renders once per submit, not once per keystroke — the field keeps up with
        your fingers.
      </p>
    </form>
  );
}
