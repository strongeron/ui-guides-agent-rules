import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Screen-reader emulation for the accessibility examples. Wrap the demo content and, when
 * the viewer opts in, it walks the REAL rendered DOM of that content, approximates the
 * accessible-name computation (aria-label → aria-labelledby → alt → associated label →
 * text), and shows the linearized reading order a screen reader would encounter — then
 * speaks it via the Web Speech API. It is an APPROXIMATION, not a real NVDA/VoiceOver:
 * it reads the actual semantics, which is what makes the bad-vs-good contrast honest.
 */

interface Utterance {
  role: string;
  name: string;
  /** True when the element is announceable but has no accessible name — the failure we want heard. */
  missing?: boolean;
}

const HEADING = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

function roleOf(el: Element): string | null {
  const explicit = el.getAttribute('role');
  if (explicit) return explicit === 'img' ? 'image' : explicit;
  const tag = el.tagName.toLowerCase();
  if (HEADING.has(tag)) return `heading level ${tag[1]}`;
  switch (tag) {
    case 'button':
      return 'button';
    case 'a':
      return el.hasAttribute('href') ? 'link' : null;
    case 'img':
      return 'image';
    case 'canvas':
      return 'graphic';
    case 'select':
      return 'combo box';
    case 'textarea':
      return 'text field';
    case 'figcaption':
      return 'caption';
    case 'input': {
      const t = (el.getAttribute('type') || 'text').toLowerCase();
      if (t === 'checkbox') return 'checkbox';
      if (t === 'radio') return 'radio';
      if (t === 'button' || t === 'submit' || t === 'reset') return 'button';
      return 'text field';
    }
    default:
      return null;
  }
}

function nameOf(el: Element): string {
  const label = el.getAttribute('aria-label');
  if (label?.trim()) return label.trim();

  const labelledby = el.getAttribute('aria-labelledby');
  if (labelledby) {
    const doc = el.ownerDocument;
    const text = labelledby
      .split(/\s+/)
      .map((id) => doc.getElementById(id)?.textContent?.replace(/\s+/g, ' ').trim() || '')
      .filter(Boolean)
      .join(' ');
    if (text) return text;
  }

  const tag = el.tagName.toLowerCase();
  if (tag === 'img') return (el.getAttribute('alt') || '').trim(); // alt="" → decorative → empty name
  if (tag === 'canvas') return ''; // a bare canvas has no name unless role/aria supplied one above

  if (tag === 'input' || tag === 'select' || tag === 'textarea') {
    const id = el.getAttribute('id');
    if (id) {
      const forLabel = el.ownerDocument.querySelector(`label[for="${CSS.escape(id)}"]`);
      if (forLabel?.textContent?.trim()) return forLabel.textContent.replace(/\s+/g, ' ').trim();
    }
    const wrapping = el.closest('label');
    if (wrapping?.textContent?.trim()) return wrapping.textContent.replace(/\s+/g, ' ').trim();
    // Deliberately NOT falling back to placeholder — a placeholder is not an accessible
    // name, and treating it as one would hide exactly the failure these examples teach.
    return (el.getAttribute('title') || '').trim();
  }

  const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
  if (text) return text;
  return (el.getAttribute('title') || '').trim();
}

function tableUtterances(table: Element): Utterance[] {
  const caption = table.querySelector('caption')?.textContent?.replace(/\s+/g, ' ').trim();
  const out: Utterance[] = [{ role: 'table', name: caption || '', missing: !caption }];
  for (const tr of Array.from(table.querySelectorAll('tbody tr'))) {
    const header = tr.querySelector('th')?.textContent?.trim();
    const cells = Array.from(tr.querySelectorAll('td')).map((td) => td.textContent?.trim() || '');
    const line = [header, ...cells].filter(Boolean).join(', ');
    if (line) out.push({ role: 'row', name: line });
  }
  return out;
}

function readingOrder(root: HTMLElement): Utterance[] {
  const out: Utterance[] = [];
  const visit = (el: Element) => {
    if (el.getAttribute('aria-hidden') === 'true') return; // skipped by AT, subtree and all
    if ((el as HTMLElement).hidden) return;

    const tag = el.tagName.toLowerCase();
    if (tag === 'table') {
      out.push(...tableUtterances(el));
      return; // handled; don't descend
    }

    const role = roleOf(el);
    if (role) {
      const name = nameOf(el);
      const decorativeImg = tag === 'img' && el.getAttribute('alt') === '';
      if (!decorativeImg) out.push({ role, name, missing: !name });
    }

    for (const child of Array.from(el.children)) visit(child);
  };
  for (const child of Array.from(root.children)) visit(child);
  return out;
}

function say(u: Utterance): string {
  return u.missing ? `${u.role}, no accessible name` : `${u.role}, ${u.name}`;
}

export function ScreenReaderView({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [items, setItems] = useState<Utterance[]>([]);
  const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const scan = useCallback(() => {
    if (ref.current) setItems(readingOrder(ref.current));
  }, []);

  useEffect(() => {
    return () => {
      if (canSpeak) window.speechSynthesis.cancel();
    };
  }, [canSpeak]);

  const toggle = (checked: boolean) => {
    setOn(checked);
    if (checked) scan();
    else if (canSpeak) window.speechSynthesis.cancel();
  };

  const announceAll = () => {
    const fresh = ref.current ? readingOrder(ref.current) : items;
    setItems(fresh);
    if (!canSpeak) return;
    window.speechSynthesis.cancel();
    for (const u of fresh) window.speechSynthesis.speak(new SpeechSynthesisUtterance(say(u)));
  };

  const announceOne = (u: Utterance) => {
    if (!canSpeak) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(say(u)));
  };

  return (
    <div className="w-full">
      <div ref={ref}>{children}</div>

      <div className="mt-3 rounded-md border border-dashed border-border p-3">
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={on}
            onChange={(e) => toggle(e.target.checked)}
            className="size-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
          Screen-reader emulation
          <span className="text-muted-foreground/70">— approximation, not a real screen reader</span>
        </label>

        {on && (
          <div className="mt-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">Reading order</span>
              <button
                type="button"
                onClick={announceAll}
                className="rounded bg-primary px-2 py-1 text-xs text-primary-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                title={canSpeak ? 'Speak the reading order' : 'Speech not available in this browser'}
              >
                ▶ Announce
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-xs text-destructive">
                Nothing announceable — a screen reader finds no names or roles here and skips it.
              </p>
            ) : (
              <ol className="space-y-1">
                {items.map((u, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => announceOne(u)}
                      className="flex w-full items-baseline gap-2 rounded px-1 py-0.5 text-left text-xs hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="shrink-0 font-mono text-muted-foreground">{u.role}</span>
                      {u.missing ? (
                        <span className="text-destructive">(no accessible name — likely skipped)</span>
                      ) : (
                        <span className="text-foreground">{u.name}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
