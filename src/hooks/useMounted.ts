import { useEffect, useState } from 'react';

/**
 * False during server rendering *and* during the client's first render, true after.
 *
 * Hydration compares the server's markup against the client's first pass, so anything
 * the server cannot know — whether a media query matches, how much of a list is worth
 * shipping in static HTML — has to be deferred past that first render rather than
 * branched on during it. Gate on this and both renders agree by construction.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
