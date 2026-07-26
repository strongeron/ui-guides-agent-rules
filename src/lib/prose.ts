/**
 * Principle explanations are authored as one long string — no blank lines anywhere in
 * the corpus, and up to ~1,800 characters. Rendered verbatim that is a wall of text
 * nobody finishes reading, so we break it into paragraphs at sentence boundaries at
 * render time rather than reformatting 404 data entries by hand.
 *
 * Authored breaks always win: if an explanation ever does contain blank lines, that is
 * an intentional structure and we leave it alone.
 */

/** Below this, a single block still reads comfortably — don't manufacture structure. */
const SPLIT_ABOVE = 420;

/** Aim for paragraphs around this length; sentences are never cut mid-way to hit it. */
const TARGET_LENGTH = 360;

/** A trailing scrap shorter than this reads as an orphan, so it folds into the previous. */
const ORPHAN_LENGTH = 130;

/**
 * Split after terminal punctuation followed by whitespace and something that can
 * plausibly start a sentence. The lookbehind exempts abbreviations that legitimately
 * precede a capital ("e.g. Chrome", "vs. Safari") — without it those split mid-thought.
 * Inline code is a real sentence opener here ("`margin-left` means…"), hence the
 * backtick in the lookahead.
 */
const SENTENCE_BOUNDARY =
  /(?<!\b(?:e\.g|i\.e|etc|vs|cf|approx|Mr|Ms|Mrs|Dr|Prof|Fig|No|St)\.)(?<=[.!?][)\]"'”’]?)\s+(?=[A-Z`"'“‘(\d])/;

export function splitIntoParagraphs(text: string | undefined | null): string[] {
  const trimmed = text?.trim();
  if (!trimmed) return [];

  const authored = trimmed
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (authored.length > 1) return authored;

  if (trimmed.length <= SPLIT_ABOVE) return [trimmed];

  const sentences = trimmed.split(SENTENCE_BOUNDARY).filter(Boolean);
  if (sentences.length < 2) return [trimmed];

  const paragraphs: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    current = current ? `${current} ${sentence}` : sentence;
    if (current.length >= TARGET_LENGTH) {
      paragraphs.push(current);
      current = '';
    }
  }

  if (current) {
    if (paragraphs.length && current.length < ORPHAN_LENGTH) {
      paragraphs[paragraphs.length - 1] += ` ${current}`;
    } else {
      paragraphs.push(current);
    }
  }

  return paragraphs;
}
