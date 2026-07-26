/**
 * Path-based routing, replacing the URL-hash binding.
 *
 * Hash fragments are not distinct URLs to a crawler, so all 404 rules used to collapse
 * into one indexable page with one title and one OG card. These paths are prerendered
 * at build time (see scripts/prerender.ts), which is what makes them real.
 *
 * URLs are derived from the principle id, not from `category` + slug. The id is the
 * published identifier — it appears in llms-full.txt and in every per-rule payload —
 * whereas category is metadata that can be corrected later. Deriving a permanent URL
 * from a mutable field is how you end up owing redirects forever.
 */

export type Route =
  | { kind: 'principle'; id: string }
  | { kind: 'sources' }
  | { kind: 'codehike' };

export const principlePath = (id: string) => `/principles/${id}`;
export const SOURCES_PATH = '/sources';
export const CODEHIKE_PATH = '/codehike-demo';

export function parsePath(pathname: string): Route | null {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === SOURCES_PATH) return { kind: 'sources' };
  if (clean === CODEHIKE_PATH) return { kind: 'codehike' };

  const match = clean.match(/^\/principles\/([^/]+)$/);
  if (match) return { kind: 'principle', id: decodeURIComponent(match[1]) };

  return null;
}

/**
 * Legacy hash URLs are permanent. `llms.txt` deep-links categories by hash and
 * `llms-full.txt` carries a hash permalink for every rule — all published, all in the
 * wild. This maps them onto the new paths; deleting it breaks citations we made.
 */
export function routeFromLegacyHash(hash: string): Route | null {
  const id = hash.replace(/^#/, '');
  if (!id) return null;
  if (id === 'sources') return { kind: 'sources' };
  if (id === 'codehike-demo') return { kind: 'codehike' };
  return { kind: 'principle', id };
}

export function pathForRoute(route: Route): string {
  switch (route.kind) {
    case 'principle':
      return principlePath(route.id);
    case 'sources':
      return SOURCES_PATH;
    case 'codehike':
      return CODEHIKE_PATH;
  }
}

/**
 * Let the browser handle anything that isn't a plain left-click: modified clicks open
 * new tabs, and intercepting them would break a habit users rely on.
 */
export function shouldInterceptClick(e: React.MouseEvent): boolean {
  return !(
    e.defaultPrevented ||
    e.button !== 0 ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey
  );
}
