import { useEffect, useRef, useState } from 'react';

/**
 * Reads what an assistive technology would actually compute for the input:
 * its accessible name, its validity state, and its accessible description
 * (the concatenated text of every element listed in aria-describedby).
 */
function useComputedA11y(
  ref: React.RefObject<HTMLInputElement | null>,
  deps: unknown[]
) {
  const [computed, setComputed] = useState({
    name: '—',
    state: '—',
    description: '—',
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ids = (el.getAttribute('aria-describedby') ?? '')
      .split(/\s+/)
      .filter(Boolean);

    const description = ids
      .map((id) => document.getElementById(id)?.textContent?.trim() ?? '')
      .filter(Boolean)
      .join(' ');

    setComputed({
      name: el.labels?.[0]?.textContent?.trim() || '(no accessible name)',
      state: el.getAttribute('aria-invalid') === 'true' ? 'invalid' : 'valid',
      description: description || '(no description)',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return computed;
}

export function ErrorProgrammaticAssociationGood() {
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const computed = useComputedA11y(inputRef, [submitted]);

  // The error id is only in the list once the error exists; the hint id is
  // always there. Both are announced, in list order.
  const describedBy = ['epa-good-hint'];
  if (submitted) describedBy.unshift('epa-good-error');

  return (
    <div className="w-full space-y-4">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="space-y-2"
      >
        <label htmlFor="epa-good-email" className="block text-sm font-medium text-foreground">
          Email
        </label>

        <input
          ref={inputRef}
          id="epa-good-email"
          type="email"
          defaultValue="not-an-email"
          aria-invalid={submitted || undefined}
          aria-describedby={describedBy.join(' ')}
          className={`w-full rounded-lg border px-3 py-2 text-sm bg-background text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring ${
            submitted ? 'border-destructive' : 'border-input'
          }`}
        />

        {/* Persistent helper text — always associated, error or not. */}
        <p id="epa-good-hint" className="text-xs text-muted-foreground">
          We only email you about your account.
        </p>

        {submitted && (
          <p id="epa-good-error" className="text-xs text-destructive">
            Invalid email — use the format name@example.com
          </p>
        )}

        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Submit
        </button>
      </form>

      <div className="rounded-lg border border-border bg-card p-3 space-y-2">
        <p className="text-xs font-semibold text-foreground">
          What a screen reader announces (computed from the live DOM)
        </p>
        <dl className="grid grid-cols-[7rem_1fr] gap-x-3 gap-y-1 text-xs">
          <dt className="text-muted-foreground">Name</dt>
          <dd className="text-foreground">{computed.name}</dd>
          <dt className="text-muted-foreground">State</dt>
          <dd className="text-success font-medium">{computed.state}</dd>
          <dt className="text-muted-foreground">Description</dt>
          <dd className="text-success font-medium">{computed.description}</dd>
        </dl>
      </div>

      <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs text-foreground"><code>{`<input
  id="email"
  aria-invalid="true"
  aria-describedby="email-err email-hint"
/>
<p id="email-hint">We only email you about your account.</p>
<p id="email-err">Invalid email — use the format name@example.com</p>`}</code></pre>

      <p className="text-xs text-success">
        aria-describedby takes a space-separated list of ids, not one — the error AND the persistent
        hint are both announced. Submit: the state flips to invalid and the description grows the
        error. That is the part people get wrong: they overwrite the hint id instead of adding to it.
      </p>
    </div>
  );
}
