import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Navigation } from './components/Navigation';
import { PrincipleView } from './components/PrincipleView';
import { principles } from './data/principles';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    const index = principles.findIndex((p) => p.id === principleId);
    if (index !== -1) {
      setCurrentIndex(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
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

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const index = principles.findIndex((p) => p.id === hash);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, []);

  useEffect(() => {
    window.history.replaceState(null, '', `#${currentPrinciple.id}`);
  }, [currentPrinciple.id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentIndex={currentIndex}
        totalCount={principles.length}
        onMenuToggle={() => setIsSidebarOpen(true)}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        principles={principles}
        currentPrincipleId={currentPrinciple.id}
        onPrincipleSelect={handlePrincipleSelect}
      />

      <main className="min-h-screen">
        <PrincipleView principle={currentPrinciple} />
      </main>

      <Navigation
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={currentIndex > 0}
        hasNext={currentIndex < principles.length - 1}
      />
    </div>
  );
}

export default App;
