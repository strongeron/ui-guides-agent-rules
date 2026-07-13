/** Synchronously block the main thread for ~ms. Demo-only, to reveal which
 * animations survive a busy main thread (compositor) vs freeze (main thread). */
export function blockMainThread(ms: number): void {
  const end = performance.now() + ms;
  while (performance.now() < end) {
    /* busy-wait */
  }
}
