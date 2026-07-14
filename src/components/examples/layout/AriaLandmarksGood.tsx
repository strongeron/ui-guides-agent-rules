import { useEffect, useRef, useState } from 'react';

/** HTML sectioning elements and the landmark roles they map to at page scope (APG). */
const IMPLIED_ROLE: Record<string, string> = {
  HEADER: 'banner',
  NAV: 'navigation',
  MAIN: 'main',
  ASIDE: 'complementary',
  FOOTER: 'contentinfo',
};

const LANDMARK_ROLES = new Set([
  'banner',
  'navigation',
  'main',
  'complementary',
  'contentinfo',
  'region',
  'search',
  'form',
]);

interface Landmark {
  role: string;
  name: string;
}

function accessibleName(el: Element): string {
  const labelledBy = el.getAttribute('aria-labelledby');
  if (labelledBy) {
    const target = document.getElementById(labelledBy);
    if (target?.textContent) return target.textContent.trim();
  }
  return el.getAttribute('aria-label')?.trim() ?? '';
}

/** The list a screen-reader user gets from the landmark rotor, built from the real DOM of the pane. */
function collectLandmarks(root: HTMLElement): Landmark[] {
  const nodes = root.querySelectorAll<HTMLElement>('header, nav, main, aside, footer, [role]');
  const found: Landmark[] = [];
  nodes.forEach((el) => {
    const explicit = el.getAttribute('role');
    const role = explicit && LANDMARK_ROLES.has(explicit) ? explicit : IMPLIED_ROLE[el.tagName];
    if (!role) return;
    found.push({ role, name: accessibleName(el) });
  });
  return found;
}

export function AriaLandmarksGood() {
  const mockRef = useRef<HTMLDivElement>(null);
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);

  useEffect(() => {
    if (mockRef.current) setLandmarks(collectLandmarks(mockRef.current));
  }, []);

  return (
    <div className="w-full max-w-md space-y-4">
      {/* aria-hidden so this mock page does not add duplicate landmarks to the real page around it. */}
      <div
        ref={mockRef}
        aria-hidden="true"
        className="rounded-lg border border-border bg-card p-3 text-xs text-foreground"
      >
        <header className="flex items-center justify-between rounded bg-muted p-2">
          <span className="font-semibold">Acme</span>
          <span className="text-muted-foreground">Sign out</span>
        </header>
        {/* Two navigation landmarks on one page, so each gets a unique label. */}
        <nav aria-label="Primary" className="mt-2 flex gap-3 rounded bg-muted p-2 text-muted-foreground">
          <span>Dashboard</span>
          <span>Invoices</span>
          <span>Settings</span>
        </nav>
        <nav aria-label="Breadcrumb" className="mt-2 rounded bg-muted p-2 text-muted-foreground">
          Home / Invoices / #1042
        </nav>
        <div className="mt-2 flex gap-2">
          <main className="flex-1 rounded bg-muted p-2">
            <p className="font-medium">Invoice #1042</p>
            <p className="text-muted-foreground">Due 1 August</p>
          </main>
          <aside aria-label="Related invoices" className="w-24 rounded bg-muted p-2 text-muted-foreground">
            Related
          </aside>
        </div>
        <footer className="mt-2 rounded bg-muted p-2 text-muted-foreground">© Acme</footer>
      </div>

      <div className="rounded-lg border border-border bg-card p-3">
        <p className="text-xs font-semibold text-foreground mb-2">Screen-reader landmark rotor</p>
        <ol className="space-y-1">
          {landmarks.map((l, i) => (
            <li key={i} className="font-mono text-xs text-foreground">
              {`${l.name} ${l.role}`.trim()}
            </li>
          ))}
        </ol>
        <p className="mt-2 text-xs text-muted-foreground">
          Roles shown as they map at page scope. The label is &quot;Primary&quot;, never &quot;Primary
          Navigation&quot; — the role is announced already, so that would read as &quot;Primary Navigation
          navigation&quot;.
        </p>
      </div>

      <p className="text-xs text-success">
        Rotor list computed live from this pane&apos;s DOM: six labelled regions, so a keyboard or screen-reader
        user can jump straight to main, and the two navigations are told apart.
      </p>
    </div>
  );
}
