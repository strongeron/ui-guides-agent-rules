import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';

describe('useTheme', () => {
  const mockLocalStorage: Record<string, string> = {};

  beforeEach(() => {
    // Reset localStorage mock
    vi.mocked(window.localStorage.getItem).mockImplementation(
      (key: string) => mockLocalStorage[key] ?? null
    );
    vi.mocked(window.localStorage.setItem).mockImplementation(
      (key: string, value: string) => {
        mockLocalStorage[key] = value;
      }
    );

    // Clear mock storage
    Object.keys(mockLocalStorage).forEach((key) => delete mockLocalStorage[key]);

    // Reset document classes
    document.documentElement.classList.remove('light', 'dark');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('initialization', () => {
    it('defaults to system theme when no preference is stored', () => {
      const { result } = renderHook(() => useTheme());

      expect(result.current.theme).toBe('system');
    });

    it('loads stored theme preference from localStorage', () => {
      mockLocalStorage['theme-preference'] = 'dark';

      const { result } = renderHook(() => useTheme());

      expect(result.current.theme).toBe('dark');
    });

    it('applies theme class to document on mount', () => {
      mockLocalStorage['theme-preference'] = 'dark';

      renderHook(() => useTheme());

      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  describe('setTheme', () => {
    it('updates theme state', () => {
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('dark');
      });

      expect(result.current.theme).toBe('dark');
    });

    it('persists theme to localStorage', () => {
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('dark');
      });

      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'theme-preference',
        'dark'
      );
    });

    it('applies theme class to document', () => {
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('dark');
      });

      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(document.documentElement.classList.contains('light')).toBe(false);
    });

    it('removes previous theme class when changing themes', () => {
      mockLocalStorage['theme-preference'] = 'dark';
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('light');
      });

      expect(document.documentElement.classList.contains('light')).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('toggleTheme', () => {
    it('toggles from dark to light', () => {
      mockLocalStorage['theme-preference'] = 'dark';
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('light');
    });

    it('toggles from light to dark', () => {
      mockLocalStorage['theme-preference'] = 'light';
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('dark');
    });

    it('toggles from system to light', () => {
      // system theme defaults to light when matchMedia returns false
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('light');
    });
  });

  describe('resolvedTheme', () => {
    it('returns the actual theme for light/dark', () => {
      mockLocalStorage['theme-preference'] = 'dark';
      const { result } = renderHook(() => useTheme());

      expect(result.current.resolvedTheme).toBe('dark');
    });

    it('resolves system theme based on matchMedia', () => {
      // Default matchMedia mock returns false (light mode)
      const { result } = renderHook(() => useTheme());

      expect(result.current.theme).toBe('system');
      expect(result.current.resolvedTheme).toBe('light');
    });

    it('resolves to dark when system prefers dark', () => {
      vi.mocked(window.matchMedia).mockImplementation(() => ({
        matches: true, // Prefer dark
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { result } = renderHook(() => useTheme());

      expect(result.current.theme).toBe('system');
      expect(result.current.resolvedTheme).toBe('dark');
    });
  });

  describe('system theme listener', () => {
    it('adds event listener for system theme changes', () => {
      const addEventListenerMock = vi.fn();
      vi.mocked(window.matchMedia).mockImplementation(() => ({
        matches: false,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: addEventListenerMock,
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      renderHook(() => useTheme());

      expect(addEventListenerMock).toHaveBeenCalledWith(
        'change',
        expect.any(Function)
      );
    });

    it('removes event listener when theme changes from system', () => {
      const removeEventListenerMock = vi.fn();
      vi.mocked(window.matchMedia).mockImplementation(() => ({
        matches: false,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: removeEventListenerMock,
        dispatchEvent: vi.fn(),
      }));

      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('dark');
      });

      expect(removeEventListenerMock).toHaveBeenCalled();
    });
  });
});
