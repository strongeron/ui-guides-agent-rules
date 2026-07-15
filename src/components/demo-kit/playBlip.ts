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

export interface ToneOptions {
  /** Start frequency in Hz. */
  frequency?: number;
  /** Optional glide target — the pitch ramps here over the duration. */
  endFrequency?: number;
  /** Length in seconds. */
  duration?: number;
  /** Waveform. 'sine'/'triangle' read as soft; 'sawtooth'/'square' read as harsh. */
  type?: OscillatorType;
  volume?: number;
  /** Add a slightly detuned second voice for a dissonant, alarming timbre. */
  dissonant?: boolean;
}

/**
 * A more expressive one-shot than {@link playBlip}, for the sound-design examples that
 * need to contrast weight (a light high tick vs a low, long, weighty thud) or character
 * (a gentle sine vs a harsh, dissonant sawtooth). Same rules apply: only ever from a
 * user gesture, never on mount or a timer. Pure WebAudio — no asset, no dependency.
 */
export function playTone(opts: ToneOptions = {}): void {
  const { frequency = 880, endFrequency, duration = 0.15, type = 'sine', volume = 0.3, dissonant = false } = opts;
  const Ctx = window.AudioContext ?? (window as PrefixedWindow).webkitAudioContext;
  if (!Ctx) return;

  const ctx = new Ctx();
  const gain = ctx.createGain();
  gain.connect(ctx.destination);

  const t = ctx.currentTime;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(volume, t + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

  const voices = dissonant ? [frequency, frequency * 1.06] : [frequency];
  for (const f of voices) {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(f, t);
    if (endFrequency) osc.frequency.exponentialRampToValueAtTime(endFrequency, t + duration);
    osc.connect(gain);
    osc.start(t);
    osc.stop(t + duration + 0.02);
  }
}
