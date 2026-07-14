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

export function ErrorProgrammaticAssociationBad() {
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const computed = useComputedA11y(inputRef, [submitted]);

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
        <label htmlFor="epa-bad-email" className="block text-sm font-medium text-foreground">
          Email
        </label>

        {/* No aria-invalid, no aria-describedby: the error and the hint are
            visually adjacent to the field, but not attached to it. */}
        <input
          ref={inputRef}
          id="epa-bad-email"
          type="email"
          defaultValue="not-an-email"
          className={`w-full rounded-lg border px-3 py-2 text-sm bg-background text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring ${
            submitted ? 'border-destructive' : 'border-input'
          }`}
        />

        <p className="text-xs text-muted-foreground">
          We only email you about your account.
        </p>

        {submitted && (
          <span className="block text-xs text-destructive">Invalid email</span>
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
          <dd className="text-error font-medium">{computed.state}</dd>
          <dt className="text-muted-foreground">Description</dt>
          <dd className="text-error font-medium">{computed.description}</dd>
        </dl>
      </div>

      <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs text-foreground"><code>{`<input id="email" />
<span class="text-destructive">Invalid email</span>`}</code></pre>

      <p className="text-xs text-error">
        Red text a screen-reader user never hears. Submit the form: the field still announces as
        valid, with no description. The error exists only for people who can see it.
      </p>
    </div>
  );
}
