import { useRef, useState, type ReactNode } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { VolumeHighIcon } from '@hugeicons/core-free-icons';

/**
 * A teaching aid that mimics what a screen reader would announce for the
 * control the user focuses or hovers. The announcement is computed from the
 * live DOM (accessible name + role + state), so it stays honest when the
 * markup changes — it is not hardcoded per example.
 *
 * The readout itself is aria-hidden: a real screen reader user already hears
 * the genuine announcement, so exposing the simulation would double it up.
 */

const ROLE_BY_TAG: Record<string, string> = {
  button: 'button',
  summary: 'button',
  select: 'combobox',
  textarea: 'text field',
  h1: 'heading',
  h2: 'heading',
  h3: 'heading',
  h4: 'heading',
  h5: 'heading',
  h6: 'heading',
  img: 'image',
  nav: 'navigation',
};

function getRole(el: HTMLElement): string {
  const explicit = el.getAttribute('role');
  if (explicit) return explicit;

  const tag = el.tagName.toLowerCase();
  if (tag === 'a') return el.hasAttribute('href') ? 'link' : '';
  if (tag === 'input') {
    const type = (el.getAttribute('type') || 'text').toLowerCase();
    if (type === 'checkbox') return 'checkbox';
    if (type === 'radio') return 'radio';
    if (type === 'range') return 'slider';
    if (type === 'button' || type === 'submit' || type === 'reset') return 'button';
    return 'text field';
  }
  return ROLE_BY_TAG[tag] ?? '';
}

function getName(el: HTMLElement): string {
  const label = el.getAttribute('aria-label');
  if (label?.trim()) return label.trim();

  const labelledby = el.getAttribute('aria-labelledby');
  if (labelledby) {
    const names = labelledby
      .split(/\s+/)
      .map((id) => document.getElementById(id)?.textContent?.trim())
      .filter(Boolean);
    if (names.length) return names.join(' ');
  }

  if (el.id) {
    const forLabel = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
    if (forLabel?.textContent?.trim()) return forLabel.textContent.trim();
  }

  const alt = el.getAttribute('alt');
  if (alt?.trim()) return alt.trim();

  const title = el.getAttribute('title');
  if (title?.trim()) return title.trim();

  const text = el.textContent?.replace(/\s+/g, ' ').trim();
  if (text) return text;

  return '';
}

function getState(el: HTMLElement): string[] {
  const states: string[] = [];
  if (el.getAttribute('aria-disabled') === 'true' || el.hasAttribute('disabled')) {
    states.push('dimmed');
  }
  const pressed = el.getAttribute('aria-pressed');
  if (pressed === 'true') states.push('pressed');
  if (pressed === 'false') states.push('not pressed');
  const expanded = el.getAttribute('aria-expanded');
  if (expanded === 'true') states.push('expanded');
  if (expanded === 'false') states.push('collapsed');
  const checked = el.getAttribute('aria-checked');
  if (checked === 'true') states.push('checked');
  if (checked === 'false') states.push('not checked');
  const selected = el.getAttribute('aria-selected');
  if (selected === 'true') states.push('selected');
  return states;
}

function announce(el: HTMLElement): string | null {
  const name = getName(el);
  const role = getRole(el);
  const states = getState(el);

  // Nothing meaningful to announce for a plain container.
  if (!name && !role) return null;

  const parts = [name, role, ...states].filter(Boolean);
  if (!name) {
    return `(no accessible name), ${[role, ...states].filter(Boolean).join(', ')}`;
  }
  return parts.join(', ');
}

const INTERACTIVE_SELECTOR =
  'button, a, input, select, textarea, summary, img, [role], [aria-label], [tabindex]';

interface ScreenReaderSimProps {
  children: ReactNode;
  /** Optional hint shown before the user focuses anything. */
  idle?: string;
}

export function ScreenReaderSim({
  children,
  idle = 'Tab or hover a control to hear it',
}: ScreenReaderSimProps) {
  const [message, setMessage] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const resolveFrom = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return;
    const el = target.closest<HTMLElement>(INTERACTIVE_SELECTOR);
    if (el && rootRef.current?.contains(el)) {
      setMessage(announce(el));
    }
  };

  return (
    <div ref={rootRef}>
      <div
        onFocusCapture={(e) => resolveFrom(e.target)}
        onPointerOver={(e) => resolveFrom(e.target)}
        onBlurCapture={() => setMessage(null)}
        onPointerLeave={() => setMessage(null)}
      >
        {children}
      </div>

      <div
        aria-hidden="true"
        className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <HugeiconsIcon icon={VolumeHighIcon} size={14} />
        </span>
        <span className="min-w-0 flex-1 truncate text-xs">
          <span className="text-muted-foreground">Screen reader: </span>
          {message ? (
            <span className="font-medium text-foreground">“{message}”</span>
          ) : (
            <span className="text-muted-foreground italic">{idle}</span>
          )}
        </span>
      </div>
    </div>
  );
}
