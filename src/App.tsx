import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Navigation } from './components/Navigation';
import { PrincipleView } from './components/PrincipleView';
import { SourcesPage } from './components/SourcesPage';
import { CodeHikeDemo } from './components/CodeHikeDemo';
import { CommandPalette } from './components/CommandPalette';
import { SkipLink } from './components/SkipLink';
import { Footer } from './components/Footer';
import { ActiveFilterChips } from './components/ActiveFilterChips';
import { useMediaQuery } from './hooks/useMediaQuery';
import { principles } from './data/principles';
import type { PatternSource } from './types/principle';

function App() {
  // Resolve the principle from the URL hash synchronously, so a deep link isn't
  // clobbered by the hash-sync effect on first commit.
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const hash = window.location.hash.slice(1);
    const i = principles.findIndex((p) => p.id === hash);
    return i === -1 ? 0 : i;
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [selectedSources, setSelectedSources] = useState<PatternSource[]>(() => {
    if (typeof window === 'undefined') return [];
    const raw = new URLSearchParams(window.location.search).get('source');
    return raw ? (raw.split(',').filter(Boolean) as PatternSource[]) : [];
  });
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const raw = new URLSearchParams(window.location.search).get('tag');
    return raw ? raw.split(',').filter(Boolean) : [];
  });
  const initialHash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
  const [showCodeHikeDemo, setShowCodeHikeDemo] = useState(initialHash === 'codehike-demo');
  const [showSources, setShowSources] = useState(initialHash === 'sources');

  // Desktop/tablet: sidebar always visible (md breakpoint = 768px)
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Compute available sources from principles data
  const availableSources = useMemo(() => {
    const sources = new Set<PatternSource>();
    principles.forEach((p) => {
      if (p.source) sources.add(p.source);
    });
    return Array.from(sources);
  }, []);

  // Compute available tags from principles data (sorted)
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    principles.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const currentPrinciple = principles[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < principles.length - 1) {
      setCurrentIndex(currentIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex]);

  const handlePrincipleSelect = useCallback((principleId: string) => {
    // Handle special CodeHike demo route
    if (principleId === 'codehike-demo') {
      setShowCodeHikeDemo(true);
      window.history.replaceState(null, '', `${window.location.search}#codehike-demo`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setShowCodeHikeDemo(false);
    setShowSources(false);
    const index = principles.findIndex((p) => p.id === principleId);
    if (index !== -1) {
      setCurrentIndex(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleShowSources = useCallback(() => {
    setShowSources(true);
    setShowCodeHikeDemo(false);
    window.history.replaceState(null, '', `${window.location.search}#sources`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ⌘K / Ctrl+K toggles the command palette
  useEffect(() => {
    const handlePaletteKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handlePaletteKey);
    return () => window.removeEventListener('keydown', handlePaletteKey);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target instanceof HTMLElement ? e.target : null;

      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement ||
        target?.isContentEditable
      ) {
        return;
      }

      // Don't hijack the arrow keys from widgets that own them (menus, listboxes,
      // dialogs, popovers, tabs). Otherwise navigating inside an example would
      // jump to the next rule instead.
      if (
        target?.closest(
          '[role="menu"],[role="listbox"],[role="dialog"],[role="radiogroup"],[role="tablist"],[data-slot="popover-content"],[data-radix-popper-content-wrapper]'
        )
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, handleNext, handlePrevious, isSidebarOpen]);

  // Restore state from URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash === 'codehike-demo') {
      setShowCodeHikeDemo(true);
    } else if (hash === 'sources') {
      setShowSources(true);
    } else if (hash) {
      setShowCodeHikeDemo(false);
      const index = principles.findIndex((p) => p.id === hash);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, []);

  // Update URL hash when principle changes (preserve the filter query string)
  useEffect(() => {
    if (!showCodeHikeDemo && !showSources) {
      window.history.replaceState(null, '', `${window.location.search}#${currentPrinciple.id}`);
    }
  }, [currentPrinciple.id, showCodeHikeDemo, showSources]);

  // Sync active filters to the URL query string (preserving the hash) so a filtered view is shareable
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (selectedSources.length) params.set('source', selectedSources.join(','));
    else params.delete('source');
    if (selectedTags.length) params.set('tag', selectedTags.join(','));
    else params.delete('tag');
    const qs = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`);
  }, [selectedSources, selectedTags]);

  // Dynamic page title
  useEffect(() => {
    if (showSources) {
      document.title = 'Sources — UI Guides & Agent Rules';
    } else if (showCodeHikeDemo) {
      document.title = 'CodeHike Demo — UI Guides & Agent Rules';
    } else {
      document.title = `${currentPrinciple.title} — UI Guides & Agent Rules`;
    }
  }, [currentPrinciple.title, showCodeHikeDemo, showSources]);

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <Header
        onMenuToggle={() => setIsSidebarOpen(true)}
        onSearchClick={() => setIsPaletteOpen(true)}
        onSourcesClick={handleShowSources}
        isDesktop={isDesktop}
      />

      <CommandPalette
        open={isPaletteOpen}
        onOpenChange={setIsPaletteOpen}
        onSelect={handlePrincipleSelect}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        principles={principles}
        currentPrincipleId={showSources ? 'sources' : showCodeHikeDemo ? 'codehike-demo' : currentPrinciple.id}
        onPrincipleSelect={handlePrincipleSelect}
        selectedSources={selectedSources}
        onSourcesChange={setSelectedSources}
        availableSources={availableSources}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        availableTags={availableTags}
        isDesktop={isDesktop}
      />

      <main id="main-content" className={`min-h-screen pt-14 ${isDesktop ? 'ml-80' : ''}`}>
        {!showSources && !showCodeHikeDemo && (
          <ActiveFilterChips
            selectedSources={selectedSources}
            onSourcesChange={setSelectedSources}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
          />
        )}
        {showSources ? (
          <SourcesPage />
        ) : showCodeHikeDemo ? (
          <CodeHikeDemo />
        ) : (
          <PrincipleView principle={currentPrinciple} />
        )}
        <Footer />
      </main>

      {!showCodeHikeDemo && !showSources && (
        <Navigation
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < principles.length - 1}
          isDesktop={isDesktop}
        />
      )}
    </div>
  );
}

export default App;
