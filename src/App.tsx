import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Navigation } from './components/Navigation';
import { PrincipleView } from './components/PrincipleView';
import { CodeHikeDemo } from './components/CodeHikeDemo';
import { CommandPalette } from './components/CommandPalette';
import { SkipLink } from './components/SkipLink';
import { useMediaQuery } from './hooks/useMediaQuery';
import { principles } from './data/principles';
import type { PatternSource } from './types/principle';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [selectedSources, setSelectedSources] = useState<PatternSource[]>([]);
  const [showCodeHikeDemo, setShowCodeHikeDemo] = useState(false);

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
      window.history.replaceState(null, '', '#codehike-demo');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setShowCodeHikeDemo(false);
    const index = principles.findIndex((p) => p.id === principleId);
    if (index !== -1) {
      setCurrentIndex(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
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
    } else if (hash) {
      setShowCodeHikeDemo(false);
      const index = principles.findIndex((p) => p.id === hash);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, []);

  // Update URL hash when principle changes
  useEffect(() => {
    if (!showCodeHikeDemo) {
      window.history.replaceState(null, '', `#${currentPrinciple.id}`);
    }
  }, [currentPrinciple.id, showCodeHikeDemo]);

  // Dynamic page title
  useEffect(() => {
    if (showCodeHikeDemo) {
      document.title = 'CodeHike Demo - Web Interface Guidelines';
    } else {
      document.title = `${currentPrinciple.title} - Web Interface Guidelines`;
    }
  }, [currentPrinciple.title, showCodeHikeDemo]);

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <Header
        onMenuToggle={() => setIsSidebarOpen(true)}
        onSearchClick={() => setIsPaletteOpen(true)}
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
        currentPrincipleId={showCodeHikeDemo ? 'codehike-demo' : currentPrinciple.id}
        onPrincipleSelect={handlePrincipleSelect}
        selectedSources={selectedSources}
        onSourcesChange={setSelectedSources}
        availableSources={availableSources}
        isDesktop={isDesktop}
      />

      <main id="main-content" className={`min-h-screen pt-14 ${isDesktop ? 'ml-80' : ''}`}>
        {showCodeHikeDemo ? (
          <CodeHikeDemo />
        ) : (
          <PrincipleView principle={currentPrinciple} />
        )}
      </main>

      {!showCodeHikeDemo && (
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
