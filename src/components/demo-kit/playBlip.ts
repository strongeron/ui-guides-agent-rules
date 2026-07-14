/** Safari still ships AudioContext only under the webkit prefix. */
interface PrefixedWindow {
  webkitAudioContext?: typeof AudioContext;
}

/**
 * A ~120ms sine blip for the audio-feedback examples. No asset, no dependency, and
 * it must only ever be called from inside a user gesture — never on mount, never on
 * a timer. Shared by every `interactions-sound-*` example so the WebAudio plumbing
 * lives in one place.
 */
export function playBlip(volume = 0.3, frequency = 880): void {
  const Ctx = window.AudioContext ?? (window as PrefixedWindow).webkitAudioContext;
  if (!Ctx) return;

  const ctx = new Ctx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = frequency;
  osc.connect(gain).connect(ctx.destination);

  const t = ctx.currentTime;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(volume, t + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
  osc.start(t);
  osc.stop(t + 0.14);
}
