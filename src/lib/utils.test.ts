import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn (className utility)', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    const shouldInclude = true;
    const shouldExclude = false;
    expect(cn('base', shouldInclude && 'included', shouldExclude && 'excluded')).toBe(
      'base included'
    );
  });

  it('handles undefined and null values', () => {
    expect(cn('base', undefined, null, 'end')).toBe('base end');
  });

  it('handles empty strings', () => {
    expect(cn('base', '', 'end')).toBe('base end');
  });

  it('merges Tailwind classes correctly', () => {
    // tailwind-merge should dedupe conflicting classes
    expect(cn('p-4', 'p-2')).toBe('p-2');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('preserves non-conflicting Tailwind classes', () => {
    expect(cn('p-4', 'mt-2')).toBe('p-4 mt-2');
    expect(cn('text-sm', 'font-bold')).toBe('text-sm font-bold');
  });

  it('handles array inputs via clsx', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('handles object inputs via clsx', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });

  it('handles complex mixed inputs', () => {
    expect(
      cn(
        'base',
        ['array-class'],
        { 'object-class': true, 'excluded-class': false },
        'final'
      )
    ).toBe('base array-class object-class final');
  });

  it('returns empty string for no arguments', () => {
    expect(cn()).toBe('');
  });
});
