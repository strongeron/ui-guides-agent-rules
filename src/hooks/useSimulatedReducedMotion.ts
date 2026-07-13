import { useSyncExternalStore } from 'react';

/**
 * A tiny shared store so a "Simulate reduce motion" switch in one example panel
 * flips the behaviour in the paired panel too — letting the reduced-motion
 * principles demonstrate their contrast without changing OS accessibility settings.
 */
let simulated = false;
const listeners = new Set<() => void>();

export function setSimulatedReducedMotion(value: boolean): void {
  simulated = value;
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): boolean {
  return simulated;
}

export function useSimulatedReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
