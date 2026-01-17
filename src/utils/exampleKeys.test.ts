import { describe, it, expect } from 'vitest';
import { pathToKey, pascalToKebab } from './exampleKeys';

describe('pathToKey', () => {
  it('converts a valid example path to the correct key', () => {
    expect(pathToKey('./examples/forms/EnterSubmitsBad.tsx')).toBe(
      'forms-enter-submits-bad'
    );
    expect(pathToKey('./examples/forms/EnterSubmitsGood.tsx')).toBe(
      'forms-enter-submits-good'
    );
  });

  it('handles different categories', () => {
    expect(pathToKey('./examples/interactions/ManageFocusGood.tsx')).toBe(
      'interactions-manage-focus-good'
    );
    expect(pathToKey('./examples/animations/InterruptibleGood.tsx')).toBe(
      'animations-interruptible-good'
    );
    expect(pathToKey('./examples/performance/LatencyBudgetsBad.tsx')).toBe(
      'performance-latency-budgets-bad'
    );
  });

  it('handles component names with multiple capital letters', () => {
    expect(pathToKey('./examples/performance/NoImageClsBad.tsx')).toBe(
      'performance-no-image-cls-bad'
    );
  });

  it('handles nested category paths', () => {
    expect(pathToKey('./examples/content/StableSkeletonsGood.tsx')).toBe(
      'content-stable-skeletons-good'
    );
  });

  it('returns empty string for invalid paths', () => {
    expect(pathToKey('')).toBe('');
    expect(pathToKey('invalid-path')).toBe('');
    expect(pathToKey('./components/SomeComponent.tsx')).toBe('');
    expect(pathToKey('./examples/test.tsx')).toBe(''); // Missing category
  });

  it('returns empty string for non-tsx files', () => {
    expect(pathToKey('./examples/forms/EnterSubmitsBad.ts')).toBe('');
    expect(pathToKey('./examples/forms/EnterSubmitsBad.js')).toBe('');
  });
});

describe('pascalToKebab', () => {
  it('converts PascalCase to kebab-case', () => {
    expect(pascalToKebab('EnterSubmitsBad')).toBe('enter-submits-bad');
    expect(pascalToKebab('ManageFocusGood')).toBe('manage-focus-good');
  });

  it('handles single words', () => {
    expect(pascalToKebab('Component')).toBe('component');
    expect(pascalToKebab('Button')).toBe('button');
  });

  it('handles consecutive capitals', () => {
    // Note: This is the expected behavior with the current regex
    expect(pascalToKebab('HTMLParser')).toBe('htmlparser');
    expect(pascalToKebab('XMLDocument')).toBe('xmldocument');
  });

  it('handles already lowercase strings', () => {
    expect(pascalToKebab('lowercase')).toBe('lowercase');
    expect(pascalToKebab('test')).toBe('test');
  });

  it('handles empty string', () => {
    expect(pascalToKebab('')).toBe('');
  });
});
