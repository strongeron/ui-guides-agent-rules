import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Navigation } from './components/Navigation';
import { PrincipleView } from './components/PrincipleView';
import { CodeHikeDemo } from './components/CodeHikeDemo';
import { SkipLink } from './components/SkipLink';
import { principles } from './data/principles';
import type { PatternSource } from './types/principle';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSources, setSelectedSources] = useState<PatternSource[]>([]);
  const [showCodeHikeDemo, setShowCodeHikeDemo] = useState(false);

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

  // Clear search when sidebar closes
  useEffect(() => {
    if (!isSidebarOpen) {
      setSearchQuery('');
    }
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-muted">
      <SkipLink />
      <Header
        currentIndex={currentIndex}
        totalCount={principles.length}
        onMenuToggle={() => setIsSidebarOpen(true)}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        principles={principles}
        currentPrincipleId={showCodeHikeDemo ? 'codehike-demo' : currentPrinciple.id}
        onPrincipleSelect={handlePrincipleSelect}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSources={selectedSources}
        onSourcesChange={setSelectedSources}
        availableSources={availableSources}
      />

      <main id="main-content" className="min-h-screen">
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
        />
      )}
    </div>
  );
}

export default App;
