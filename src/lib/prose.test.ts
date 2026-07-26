import { describe, expect, it } from 'vitest';
import { splitIntoParagraphs } from './prose';
import { principles } from '../data/principles';

const sentence = (n: number) => `Sentence number ${n} runs on for a while so it counts. `;

describe('splitIntoParagraphs', () => {
  it('returns nothing for empty input', () => {
    expect(splitIntoParagraphs('')).toEqual([]);
    expect(splitIntoParagraphs(undefined)).toEqual([]);
  });

  it('leaves short text as a single paragraph', () => {
    const short = 'One sentence. Then a second one.';
    expect(splitIntoParagraphs(short)).toEqual([short]);
  });

  it('respects authored blank-line breaks instead of re-splitting', () => {
    const authored = `${sentence(1).repeat(6)}\n\n${sentence(2).repeat(6)}`;
    expect(splitIntoParagraphs(authored)).toHaveLength(2);
  });

  it('splits long text into several paragraphs', () => {
    const long = Array.from({ length: 10 }, (_, i) => sentence(i + 1)).join('').trim();
    const paragraphs = splitIntoParagraphs(long);
    expect(paragraphs.length).toBeGreaterThan(1);
  });

  it('never splits inside a sentence', () => {
    const long = Array.from({ length: 10 }, (_, i) => sentence(i + 1)).join('').trim();
    for (const paragraph of splitIntoParagraphs(long)) {
      expect(paragraph).toMatch(/[.!?][)\]"'”’]?$/);
    }
  });

  it('does not break after abbreviations that precede a capital', () => {
    const text = `${sentence(1).repeat(5)}That holds in every engine, e.g. Chrome and Safari, and it always has done so reliably.`;
    for (const paragraph of splitIntoParagraphs(text)) {
      expect(paragraph).not.toMatch(/e\.g\.$/);
      expect(paragraph).not.toMatch(/^Chrome/);
    }
  });

  it('folds an orphan trailing fragment into the previous paragraph', () => {
    const text = `${sentence(1).repeat(11)}Short tail.`;
    const paragraphs = splitIntoParagraphs(text);
    const last = paragraphs[paragraphs.length - 1];
    expect(last).toMatch(/Short tail\.$/);
    expect(last.length).toBeGreaterThan(130);
  });

  it('preserves every character of the real corpus', () => {
    for (const principle of principles) {
      const source = principle.additionalExplanation ?? '';
      const rejoined = splitIntoParagraphs(source).join(' ');
      expect(rejoined).toBe(source.trim());
    }
  });

  it('breaks up the longest explanations in the corpus', () => {
    const longest = principles
      .filter((p) => (p.additionalExplanation?.length ?? 0) > 900)
      .map((p) => splitIntoParagraphs(p.additionalExplanation));
    expect(longest.length).toBeGreaterThan(0);
    for (const paragraphs of longest) {
      expect(paragraphs.length).toBeGreaterThan(1);
    }
  });
});
