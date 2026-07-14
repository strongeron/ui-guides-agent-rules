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

export function AriaLandmarksBad() {
  const mockRef = useRef<HTMLDivElement>(null);
  const [landmarks, setLandmarks] = useState<Landmark[] | null>(null);

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
        <div className="header flex items-center justify-between rounded bg-muted p-2">
          <span className="font-semibold">Acme</span>
          <span className="text-muted-foreground">Sign out</span>
        </div>
        <div className="nav mt-2 flex gap-3 rounded bg-muted p-2 text-muted-foreground">
          <span>Dashboard</span>
          <span>Invoices</span>
          <span>Settings</span>
        </div>
        <div className="breadcrumb mt-2 rounded bg-muted p-2 text-muted-foreground">Home / Invoices / #1042</div>
        <div className="content mt-2 flex gap-2">
          <div className="main flex-1 rounded bg-muted p-2">
            <p className="font-medium">Invoice #1042</p>
            <p className="text-muted-foreground">Due 1 August</p>
          </div>
          <div className="sidebar w-24 rounded bg-muted p-2 text-muted-foreground">Related</div>
        </div>
        <div className="footer mt-2 rounded bg-muted p-2 text-muted-foreground">© Acme</div>
      </div>

      <div className="rounded-lg border border-border bg-card p-3">
        <p className="text-xs font-semibold text-foreground mb-2">Screen-reader landmark rotor</p>
        {landmarks && landmarks.length === 0 ? (
          <p className="font-mono text-xs text-destructive">No landmarks found.</p>
        ) : (
          <ol className="space-y-1">
            {landmarks?.map((l, i) => (
              <li key={i} className="font-mono text-xs text-foreground">
                {`${l.name} ${l.role}`.trim()}
              </li>
            ))}
          </ol>
        )}
        <p className="mt-2 text-xs text-muted-foreground">
          Every region above is a <code>div</code> with a class name. Class names carry no semantics, so the rotor
          is empty and the page is one undifferentiated block to jump through.
        </p>
      </div>

      <p className="text-xs text-destructive">
        Rotor list computed live from this pane&apos;s DOM. Nothing to skip to, no way to reach the main content
        without walking the whole page.
      </p>
    </div>
  );
}
