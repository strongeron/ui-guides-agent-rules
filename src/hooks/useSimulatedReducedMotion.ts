import { useSyncExternalStore } from 'react';

/**
 * Reduced-motion state for the example panels.
 *
 * Two inputs, OR'd together:
 *  - the real `prefers-reduced-motion: reduce` media query, so a visitor who has
 *    reduce-motion enabled is actually respected. The examples that teach this rule
 *    must obey it themselves.
 *  - a shared "Simulate reduce motion" switch, so a visitor who does NOT have the OS
 *    setting on can still see the contrast between the paired panels without going
 *    and changing their system accessibility preferences.
 */
const QUERY = '(prefers-reduced-motion: reduce)';

let simulated = false;
const listeners = new Set<() => void>();

function mediaQuery(): MediaQueryList | null {
  return typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(QUERY) : null;
}

export function setSimulatedReducedMotion(value: boolean): void {
  simulated = value;
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  const mq = mediaQuery();
  mq?.addEventListener('change', cb);
  return () => {
    listeners.delete(cb);
    mq?.removeEventListener('change', cb);
  };
}

function getSnapshot(): boolean {
  return simulated || mediaQuery()?.matches === true;
}

/** Server render has no media query; fall back to the switch alone. */
function getServerSnapshot(): boolean {
  return simulated;
}

export function useSimulatedReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
